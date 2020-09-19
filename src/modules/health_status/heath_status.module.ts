import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthStatusContoller } from './health_status.controller';
import { HealthStatusRepository } from './health_status.repository';
import { HealthStatusService } from './health_status.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([HealthStatusRepository]),
    ],
    controllers: [HealthStatusContoller],
    providers: [HealthStatusService]
})
export class HealthStatusModule { }
