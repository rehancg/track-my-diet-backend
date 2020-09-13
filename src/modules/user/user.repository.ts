import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {

    async getUsers(): Promise<any> {
        return {success: true};
    }
}
