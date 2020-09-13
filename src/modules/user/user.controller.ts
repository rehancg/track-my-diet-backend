'use strict';

import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
} from '@nestjs/common';

import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(
        private userService: UserService,
    ) {}

    @Get('admin')
    @HttpCode(HttpStatus.OK)
    async admin(@Param() params): Promise<string> {

        return this.userService.getUsers();
    }

}
