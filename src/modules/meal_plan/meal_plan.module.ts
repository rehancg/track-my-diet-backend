import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { MealPlanContoller } from './meal_plan.controller';
import { MealPlanRepository } from './meal_plan.repository';
import { MealPlanService } from './meal_plan.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([MealPlanRepository]),
        AuthModule
    ],
    controllers: [MealPlanContoller],
    providers: [MealPlanService]
})
export class MealPlanModule { }
