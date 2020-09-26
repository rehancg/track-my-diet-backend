import { IsNotEmpty } from 'class-validator';
import { ActivityLevel } from 'src/modules/activity_level/activity_level.entity';
import { FoodType } from 'src/modules/food_type/food_type.entity';
import { Goal } from 'src/modules/goal/goal.entity';
import { HealthStatus } from 'src/modules/health_status/health_status.entity';
import { Gender, SubscriptionStatus, UserRole } from '../user.entity';

export class CreateUserDto {
    @IsNotEmpty()
    telNo: string;

    id: number;

    msisdn: string;

    subscriptionStatus: SubscriptionStatus;

    refreshToken: string;

    role: UserRole;

    height: number;

    weight: number;

    age: number;

    gender: Gender;

    language: string;

    bmi: number;

    ideal_weight: number;

    calory_requirement: number;

    activity_level: ActivityLevel;

    food_type: FoodType;

    goal: Goal;

    heath_status: HealthStatus;
}
