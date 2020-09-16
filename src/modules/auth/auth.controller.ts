'use strict';

import { Controller, Post, HttpCode, HttpStatus, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Logger } from '../../shared/logger';

@Controller('auth')
export class AuthController {
  private readonly logger: Logger = Logger.getInstance();
  constructor(private authService: AuthService) { }

  @Post('otp/request')
  async requestOtp(@Body() data: any): Promise<string> {
    this.logger.log('New otp request', JSON.stringify(data));
    return this.authService.requestOtp(data.telNumber);
  }

  @Post('otp/validate')
  async validateOtp(@Body() data: any): Promise<string> {
    this.logger.log('Otp validation request', JSON.stringify(data));
    return this.authService.validateOtp(data.otp, data.refNumber);
  }
}
