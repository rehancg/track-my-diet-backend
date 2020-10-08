'use strict';

import { Controller, Post, HttpCode, HttpStatus, Body, ValidationPipe, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Logger } from '../../shared/logger';
import { RequestOtpDto } from './dto/request-otp.dto';
import { ValidateOtpDto } from './dto/validate-otp.dto';
import { IRequestOtpResponse } from './types/request-otp-response';
import { ILoginSuccess, IValidateOtpResponse } from './types/validate-otp-response';
import { NewTokenRequestDto } from './dto/new-token-request.dto';
import { AdminAuthRequestDto } from './dto/admin-auth-request.dto';
import { User } from '../user/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
  private readonly logger: Logger = Logger.getInstance();
  constructor(private authService: AuthService) { }

  @Post('otp/request')
  async requestOtp(@Body(ValidationPipe) data: RequestOtpDto): Promise<IRequestOtpResponse> {
    this.logger.log('New otp request', JSON.stringify(data));
    return this.authService.requestOtp(data.telNo);
  }

  @Get('current-session')
  @UseGuards(AuthGuard())
  async getCurrentSession(@GetUser() user: User): Promise<User> {
    return user;
  }

  @Post('otp/validate')
  async validateOtp(@Body(ValidationPipe) data: ValidateOtpDto): Promise<ILoginSuccess> {
    this.logger.log('Otp validation request', JSON.stringify(data));
    return this.authService.validateOtp(data);
  }

  @Post('token/renew')
  async renewToken(@Body(ValidationPipe) data: NewTokenRequestDto): Promise<ILoginSuccess> {
    return this.authService.renewAppToken(data);
  }

  @Post('admin/login')
  async adminLogin(@Body(ValidationPipe) data: AdminAuthRequestDto): Promise<ILoginSuccess> {
    return this.authService.generateAdminToken(data.password);
  }
}
