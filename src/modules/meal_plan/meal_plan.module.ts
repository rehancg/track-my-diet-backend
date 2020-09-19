import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MealPlanContoller } from './meal_plan.controller';
import { MealPlanRepository } from './meal_plan.repository';
import { MealPlanService } from './meal_plan.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([MealPlanRepository]),
    ],
    controllers: [MealPlanContoller],
    providers: [MealPlanService]
})
export class MealPlanModule { }
