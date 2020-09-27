import { IsNotEmpty } from 'class-validator';
import { EatingWindow } from 'src/modules/eating_window/eating_window.entity';
import { Food } from 'src/modules/food/food.entity';
import { MealPlan } from 'src/modules/meal_plan/meal_plan.entity';

export class CreateFoodToMealPlanDto {
    id: number;

    @IsNotEmpty()
    servings: number;

    @IsNotEmpty()
    eating_window: EatingWindow;

    @IsNotEmpty()
    food: Food;

    @IsNotEmpty()
    meal_plan: MealPlan;
}
