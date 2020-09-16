import { HttpService, Injectable } from '@nestjs/common';
import * as config from 'config';
import { UserRepository } from '../user/user.repository';

const appConfig = config.get('app');
@Injectable()
export class AuthService {

    constructor(
        private httpService: HttpService
    ) { }

    async requestOtp(telNumber: string): Promise<any> {
        const res = await this.httpService.post('http://core.sdp:7000/subscription/otp/request',
            {
                applicationId: appConfig.id,
                password: appConfig.password,
                subscriberId: `tel:${telNumber}`
            }
        );

        console.log("res", JSON.stringify(res));

        return { referenceNumber: 'JFK455FF555' };
    }


    async validateOtp(otp: string, referenceNumber: string): Promise<any> {
        if (otp !== '1234') {
            return { success: false };
        }
        return { success: true };
    }
}
