import { IsNotEmpty } from 'class-validator';
import { FoodToMealPlan } from 'src/modules/food_to_meal_plan/food_to_meal_plan.entity';

export class UpdateMealPlanDto {
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    name_si: string;

    items: FoodToMealPlan[]
}
