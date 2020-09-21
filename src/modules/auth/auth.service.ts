import { BadRequestException, HttpService, Injectable, InternalServerErrorException, NotAcceptableException, NotFoundException, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as config from 'config';
import { Logger } from 'src/shared/logger';
import { SubscriptionStatus, User, UserRole } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { NewTokenRequestDto } from './dto/new-token-request.dto';
import { JwtPayload } from './jwt-payload.interface';
import { AppToken } from './types/app-token';
import { ISubscriptionStatus } from './types/get-status-response';
import { IRequestOtpResponse } from './types/request-otp-response';
import { OtpStatus, IValidateOtpResponse, ILoginSuccess } from './types/validate-otp-response';


export enum ServiceProviders {
    IDEA_MART = "ideaMart",
    MSPACE = "mSpace"
}

const ideaMartExts = ['076', '077', '074', '078', '075'];
const mSpaceExts = ['071', '070'];

@Injectable()
export class AuthService {
    private readonly logger: Logger = Logger.getInstance();

    constructor(
        private httpService: HttpService,
        private jwtService: JwtService,
        private userService: UserService,
    ) { }

    // Generate admin token
    async generateAdminToken(password: string): Promise<AppToken> {

        if (password != config('admin.password')) {
            this.logger.error('Invalid admin password entered')
            throw new UnauthorizedException();
        }

        // Get admin user
        const telNo = config('admin.telNo');
        const tokenValidity = config('admin.tokenValidity');

        return await this.generateAppToken({ msisdn: telNo }, tokenValidity)
    }

    getServiceProvide = (telNo: string): { provider: ServiceProviders, providerConfig: any, formattedTelNo: string } => {
        if (telNo.length != 10) {
            this.logger.error(`Invalid tel number ${telNo}`)
            throw new UnprocessableEntityException('Invalid mobile number entered');
        }

        let tempProvider = null;
        let tempConfig = null;

        // validate provider
        const ext = telNo.substring(0, 3);

        if (ideaMartExts.includes(ext)) {
            tempProvider = ServiceProviders.IDEA_MART;
            tempConfig = config.get('ideamart');
        }
        else if (mSpaceExts.includes(ext)) {
            tempProvider = ServiceProviders.MSPACE;
            tempConfig = config.get('mSpace');
        }
        else throw new UnprocessableEntityException('Unsupported mobile number entered');

        // Format telno with 94 prefix
        const formatedNo = telNo.replace(telNo.charAt(0), '94')

        return { provider: tempProvider, providerConfig: tempConfig, formattedTelNo: formatedNo }
    }


    renewAppToken = async (newTokenRequest: NewTokenRequestDto): Promise<AppToken> => {
        try {
            const payload = this.jwtService.decode(newTokenRequest.accessToken) as JwtPayload;

            // Check if refresh token is valid
            const user = await this.userService.getUserByMsidn(payload.msisdn);
            if (!user) {
                this.logger.error(`User not found for the token:: with msisdn ${payload.msisdn}`)
                throw new NotFoundException('User not found');
            }

            let providerConfig = null;

            if (user.role == UserRole.IDEA_MART) {
                providerConfig = config('ideamart');
            } else if (user.role == UserRole.M_SPACE) {
                providerConfig = config.get('mSpace');
            }

            if (providerConfig) {
                // Validate user subscription status
                const res = await this.httpService.post(`${providerConfig.baseurl}/subscription/getStatus`,
                    {
                        applicationId: providerConfig.id,
                        password: providerConfig.password,
                        subscriberId: user.msisdn
                    }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                ).toPromise();

                const data = res.data as ISubscriptionStatus;

                if (data.subscriptionStatus != SubscriptionStatus.REGISTERED) {
                    this.logger.error(`User session expired with no active subscription:: for msisdn ${payload.msisdn}`)
                    throw new BadRequestException('Subscription status is not active');
                }

            }

            // Generate new tokens
            const newTokens = await this.generateAppToken(payload);
            // Save new token
            user.refreshToken = newTokens.refreshToken;
            await this.userService.updateExisting(user);

            this.logger.log(`New token generated for user ${user.telNo}`)
            return newTokens;
        } catch (error) {
            this.logger.error('Error renewing token', JSON.stringify(error))
            throw new InternalServerErrorException('Token renewal failed');
        }
    }

    async generateAppToken(payload: JwtPayload, expireIn?: number): Promise<AppToken> {
        const jwtConfig = config.get('jwt');

        const accessToken = await this.jwtService.sign(payload, { expiresIn: expireIn || jwtConfig.expiresIn });
        const refreshToken = await this.jwtService.sign(payload, { secret: jwtConfig.refreshSecret, expiresIn: expireIn || jwtConfig.expiresIn });

        return {
            accessToken,
            refreshToken
        }
    }

    async requestOtp(telNumber: string): Promise<IRequestOtpResponse> {
        try {
            const { providerConfig, formattedTelNo } = this.getServiceProvide(telNumber);
            const res = await this.httpService.post(`${providerConfig.baseurl}/subscription/otp/request`,
                {
                    applicationId: providerConfig.id,
                    password: providerConfig.password,
                    subscriberId: `tel:${formattedTelNo}`,
                    applicationMetaData: {
                        client: providerConfig.applicationMetaData.client,
                        device: providerConfig.applicationMetaData.device,
                        os: providerConfig.applicationMetaData.os,
                        appCode: providerConfig.applicationMetaData.appCode,
                    }
                }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            ).toPromise();

            const data: IRequestOtpResponse = res.data;

            if (data.statusCode != OtpStatus.SUCCESS) {
                this.logger.error(`Sending otp failed`, JSON.stringify(data));
                throw new InternalServerErrorException('Error occured while sending otp')
            }

            return data;

        } catch (error) {
            this.logger.error('Sending otp failed ', JSON.stringify(error));
            throw new InternalServerErrorException('Sending otp request failed!')
        }
    }


    async validateOtp(telNo: string, otp: number, referenceNumber: string): Promise<ILoginSuccess> {
        try {
            const { providerConfig, formattedTelNo, provider } = this.getServiceProvide(telNo);

            const res = await this.httpService.post(`${providerConfig.baseurl}/subscription/otp/verify`,
                {
                    applicationId: providerConfig.id,
                    password: providerConfig.password,
                    referenceNo: referenceNumber,
                    otp: `${otp}`
                }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            ).toPromise();

            const data: IValidateOtpResponse = res.data;
            let user = await this.userService.getUserByMsidn(formattedTelNo);
            let tokens = null;

            if (data.statusCode == OtpStatus.SUCCESS) {
                tokens = await this.generateAppToken({ msisdn: data.subscriberId });

                if (!user) user = new User();
                user.telNo = formattedTelNo;
                user.msisdn = formattedTelNo;
                user.refreshToken = tokens.refreshToken;
                user.subscriptionStatus = SubscriptionStatus.PENDING_CHARGE;

                if (provider == ServiceProviders.IDEA_MART) {
                    user.role = UserRole.IDEA_MART
                } else if (provider == ServiceProviders.MSPACE) {
                    user.role = UserRole.M_SPACE
                }
            } else if (user?.role === UserRole.TESTER) {
                tokens = await this.generateAppToken({ msisdn: user.telNo });
                user.refreshToken = tokens.refreshToken;
            }
            else {
                throw new NotAcceptableException('Invalid otp entered')
            }


            await this.userService.upsert(user);
            return tokens;

        } catch (error) {
            this.logger.error('Validating otp failed ', JSON.stringify(error));
            throw new InternalServerErrorException('Validating otp request failed!', error.message)
        }
    }


}
