import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { FoodToMealPlanModule } from '../food_to_meal_plan/food_to_meal_plan.module';
import { MealPlanContoller } from './meal_plan.controller';
import { MealPlanRepository } from './meal_plan.repository';
import { MealPlanService } from './meal_plan.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([MealPlanRepository]),
        AuthModule,
        FoodToMealPlanModule
    ],
    controllers: [MealPlanContoller],
    providers: [MealPlanService]
})
export class MealPlanModule { }
