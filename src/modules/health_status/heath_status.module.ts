import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { HealthStatusContoller } from './health_status.controller';
import { HealthStatusRepository } from './health_status.repository';
import { HealthStatusService } from './health_status.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([HealthStatusRepository]),
        AuthModule
    ],
    controllers: [HealthStatusContoller],
    providers: [HealthStatusService]
})
export class HealthStatusModule { }
