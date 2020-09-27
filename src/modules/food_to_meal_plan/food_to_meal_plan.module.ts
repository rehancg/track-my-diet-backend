import { forwardRef, Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodToMealPlanRepository } from './food_to_meal_plan.repository';
import { FoodToMealPlanService } from './food_to_meal_plan.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([FoodToMealPlanRepository]),
    ],
    providers: [FoodToMealPlanService],
    exports: [FoodToMealPlanService]
})
export class FoodToMealPlanModule { }
