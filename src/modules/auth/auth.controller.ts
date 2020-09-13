'use strict';

import { Controller, Post, HttpCode, HttpStatus, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Logger } from '../../shared/logger';

@Controller('auth')
export class AuthController {
  private readonly logger: Logger = Logger.getInstance();
  constructor(private authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.OK)
  async userRegister(@Body() data: any): Promise<string> {
    this.logger.log('User registration request', JSON.stringify(data));
    return this.authService.userRegister(data.telNumber);
  }

  @Post('validate/otp')
  @HttpCode(HttpStatus.OK)
  async validateOtp(@Body() data: any): Promise<string> {
    this.logger.log('Otp validation request', JSON.stringify(data));
    return this.authService.validateOtp(data.otp, data.refNumber);
  }
}
