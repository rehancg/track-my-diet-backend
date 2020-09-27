import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { EatingWindow } from 'src/modules/eating_window/eating_window.entity';
import { NutritionType } from 'src/modules/nutrition_type/nutrition_type.entity';

export class CreateFoodDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    name_si: string;

    thumbnail: string;

    image_url: string;

    @IsNotEmpty()
    serving_unit: string;

    @Type(() => Number)
    @IsNotEmpty()
    serving_size: number;

    @Type(() => Number)
    @IsNotEmpty()
    calories: number;

    @Type(() => Number)
    @IsNotEmpty()
    protein: number;

    @Type(() => Number)
    @IsNotEmpty()
    fat: number;

    @Type(() => Number)
    @IsNotEmpty()
    carb: number;

    @Type(() => Number)
    @IsNotEmpty()
    cost: number;

    @IsNotEmpty()
    is_budget: boolean;

    @IsNotEmpty()
    is_supplement: boolean;

    @IsNotEmpty()
    nutrition_type: NutritionType

    @IsNotEmpty()
    eating_window: EatingWindow
}
