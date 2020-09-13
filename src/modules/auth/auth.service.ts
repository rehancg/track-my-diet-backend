import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

    async userRegister(telNumber: string): Promise<any> {
        return {referenceNumber: 'JFK455FF555'};
    }
    async validateOtp(otp: string, referenceNumber: string): Promise<any> {
        if (otp !== '1234') {
            return {success: false};
        }
        return {success: true};
    }
}
