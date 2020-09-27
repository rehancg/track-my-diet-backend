import { IsNotEmpty } from 'class-validator';
import { FoodToMealPlan } from 'src/modules/food_to_meal_plan/food_to_meal_plan.entity';
import { FoodType } from 'src/modules/food_type/food_type.entity';

export class CreateMealPlanDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    name_si: string;

    @IsNotEmpty()
    food_type: FoodType;

    items: FoodToMealPlan[]
}
