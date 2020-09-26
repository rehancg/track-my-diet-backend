import { IsNotEmpty } from 'class-validator';
import { EatingWindow } from 'src/modules/eating_window/eating_window.entity';
import { FoodType } from 'src/modules/food_type/food_type.entity';
import { HealthStatus } from 'src/modules/health_status/health_status.entity';
import { NutritionType } from 'src/modules/nutrition_type/nutrition_type.entity';

export class UpdateFoodDto {
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    name_si: string;

    // @IsNotEmpty()
    thumbnail: string;

    // @IsNotEmpty()
    image_url: string;

    @IsNotEmpty()
    serving_unit: string;

    @IsNotEmpty()
    serving_size: number;

    @IsNotEmpty()
    calories: number;

    @IsNotEmpty()
    protein: number;

    @IsNotEmpty()
    fat: number;

    @IsNotEmpty()
    carb: number;

    @IsNotEmpty()
    cost: number;

    @IsNotEmpty()
    is_budget: boolean;

    @IsNotEmpty()
    nutrition_type: NutritionType

    @IsNotEmpty()
    eating_window: EatingWindow
}
