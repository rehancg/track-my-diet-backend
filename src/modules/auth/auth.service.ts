import { HttpService, Injectable, InternalServerErrorException, NotAcceptableException } from '@nestjs/common';
import * as config from 'config';
import { Observable } from 'rxjs';
import { Logger } from 'src/shared/logger';
import { UserRepository } from '../user/user.repository';
import { RequestOtpResponseDto } from './dto/request-otp-response.dto';
import { OtpStatus, ValidateOtpResponseDto } from './dto/validate-otp-response.dto';

const appConfig = config.get('app');
const ideamartConfig = config.get('ideamart');
@Injectable()
export class AuthService {
    private readonly logger: Logger = Logger.getInstance();

    constructor(
        private httpService: HttpService
    ) { }

    async requestOtp(telNumber: number): Promise<RequestOtpResponseDto> {
        try {
            const res = await this.httpService.post(`${ideamartConfig.baseurl}/subscription/otp/request`,
                {
                    applicationId: appConfig.id,
                    password: appConfig.password,
                    subscriberId: `tel:${telNumber}`
                }
            ).toPromise();

            const data: RequestOtpResponseDto = res.data;
            this.logger.log('Request otp response ', JSON.stringify(data))

            return res.data;

        } catch (error) {
            this.logger.error('Sending otp failed ', error.stack);
            throw new InternalServerErrorException('Sending otp request failed!')
        }
    }


    async validateOtp(otp: number, referenceNumber: string): Promise<ValidateOtpResponseDto> {
        try {
            const res = await this.httpService.post(`${ideamartConfig.baseurl}/subscription/otp/verify`,
                {
                    applicationId: appConfig.id,
                    password: appConfig.password,
                    referenceNo: referenceNumber,
                    otp: `${otp}`
                }
            ).toPromise();

            const data: ValidateOtpResponseDto = res.data;
            this.logger.log('Validate otp response ', JSON.stringify(data))

            if (data.statusCode == OtpStatus.SUCCESS) {
                // @TODO - save user and generate token
                return data;
            } else {
                throw new NotAcceptableException('Invalid otp entered')
            }

        } catch (error) {
            this.logger.error('Validating otp failed ', error.stack);
            throw new InternalServerErrorException('Validating otp request failed!')
        }
    }
}
