'use strict';

import { Controller, Post, HttpCode, HttpStatus, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Logger } from '../../shared/logger';
import { RequestOtpDto } from './dto/request-otp.dto';
import { RequestOtpResponseDto } from './dto/request-otp-response.dto';
import { ValidateOtpDto } from './dto/validate-otp.dto';
import { ValidateOtpResponseDto } from './dto/validate-otp-response.dto';

@Controller('auth')
export class AuthController {
  private readonly logger: Logger = Logger.getInstance();
  constructor(private authService: AuthService) { }

  @Post('otp/request')
  async requestOtp(@Body(ValidationPipe) data: RequestOtpDto): Promise<RequestOtpResponseDto> {
    this.logger.log('New otp request', JSON.stringify(data));
    return this.authService.requestOtp(data.telNo);
  }

  @Post('otp/validate')
  async validateOtp(@Body(ValidationPipe) data: ValidateOtpDto): Promise<ValidateOtpResponseDto> {
    this.logger.log('Otp validation request', JSON.stringify(data));
    return this.authService.validateOtp(data.otp, data.referenceNo);
  }
}
