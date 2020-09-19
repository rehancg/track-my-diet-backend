import { IsNotEmpty } from 'class-validator';
import { ActivityLevel } from 'src/modules/activity_level/activity_level.entity';
import { FoodType } from 'src/modules/food_type/food_type.entity';
import { Goal } from 'src/modules/goal/goal.entity';

export class CreateUserDto {
    @IsNotEmpty()
    telNo: string;

    msisdn: string;

    isVip: boolean;

    height: number;

    weight: number;

    age: number;

    gender: string;

    language: string;

    bmi: number;
    ideal_weight: number;

    calory_requirement: number;

    activity_level: ActivityLevel;

    food_type: FoodType;

    goal: Goal;
}
