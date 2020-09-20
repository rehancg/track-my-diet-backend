import { HttpService, Injectable, InternalServerErrorException, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as config from 'config';
import { Logger } from 'src/shared/logger';
import { JwtPayload } from './jwt-payload.interface';
import { IRequestOtpResponse } from './types/request-otp-response';
import { OtpStatus, IValidateOtpResponse, ILoginSuccess } from './types/validate-otp-response';

const appConfig = config.get('app');
const ideamartConfig = config.get('ideamart');
@Injectable()
export class AuthService {
    private readonly logger: Logger = Logger.getInstance();

    constructor(
        private httpService: HttpService,
        private jwtService: JwtService,
    ) { }

    async requestOtp(telNumber: number): Promise<IRequestOtpResponse> {
        try {
            const res = await this.httpService.post(`${ideamartConfig.baseurl}/subscription/otp/request`,
                {
                    applicationId: appConfig.id,
                    password: appConfig.password,
                    subscriberId: `tel:${telNumber}`,
                    applicationMetaData: {
                        client: appConfig.applicationMetaData.client,
                        device: appConfig.applicationMetaData.device,
                        os: appConfig.applicationMetaData.os,
                        appCode: appConfig.applicationMetaData.appCode,
                    }
                }
            ).toPromise();

            const data: IRequestOtpResponse = res.data;
            this.logger.log('Request otp response ', JSON.stringify(data))

            return res.data;

        } catch (error) {
            this.logger.error('Sending otp failed ', error.stack);
            throw new InternalServerErrorException('Sending otp request failed!')
        }
    }


    async validateOtp(otp: number, referenceNumber: string): Promise<ILoginSuccess> {
        try {
            const res = await this.httpService.post(`${ideamartConfig.baseurl}/subscription/otp/verify`,
                {
                    applicationId: appConfig.id,
                    password: appConfig.password,
                    referenceNo: referenceNumber,
                    otp: `${otp}`
                }
            ).toPromise();

            const data: IValidateOtpResponse = res.data;
            this.logger.log('Validate otp response ', JSON.stringify(data))

            if (data.statusCode == OtpStatus.SUCCESS) {
                // @TODO - save user and generate token
                const payload: JwtPayload = { msisdn: data.subscriberId };
                const accessToken = await this.jwtService.sign(payload);

                return { accessToken };
            } else {
                throw new NotAcceptableException('Invalid otp entered')
            }

        } catch (error) {
            this.logger.error('Validating otp failed ', error.stack);
            throw new InternalServerErrorException('Validating otp request failed!')
        }
    }
}
