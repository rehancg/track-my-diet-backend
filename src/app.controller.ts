import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('shop/')
  getNearestShops(@Query() query): Promise<object> {
    if (!query.lat || !query.long) {
      throw new BadRequestException();
    }
    return this.appService.getNearestShops(Number(query.lat), Number(query.long));
  }
}
