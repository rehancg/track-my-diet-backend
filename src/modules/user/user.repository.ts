import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserRepository extends Repository<User>{

    private logger = new Logger('UserRepository');

    async saveUser(telNo: string, msisdn: string) {
        const user = new User();
        user.isVip = false;
        user.msisdn = msisdn;
        user.telNo = telNo;

        try {
            await user.save()
        } catch (error) {
            this.logger.log(`Failed to create user ${telNo}`, error.stack)
            throw new InternalServerErrorException()
        }
    }
}
