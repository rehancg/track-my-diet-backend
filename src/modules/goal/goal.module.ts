import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoalRepository } from './goal.repository';
import { GoalContoller } from './goal.controller';
import { GoalService } from './goal.sevice';
import { AuthModule } from '../auth/auth.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([GoalRepository]),
        AuthModule
    ],
    controllers: [GoalContoller],
    providers: [GoalService]
})
export class GoalModule { }
