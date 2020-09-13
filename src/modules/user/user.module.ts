import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import {UserRepository} from './user.repository';

@Module({
    controllers: [UserController],
    exports: [UserService, UserRepository],
    providers: [UserService, UserRepository],
})
export class UserModule {}
