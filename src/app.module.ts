import {
  Module,
} from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ActivityLevelModule } from './modules/activity_level/activity_level.module';
import { ArticleCategoryModule } from './modules/article_category/article_category.module';
import { EatingWindowModule } from './modules/eating_window/eating_window.module';
import { FoodTypeModule } from './modules/food_type/food_type.module';
import { GoalModule } from './modules/goal/goal.module';
import { NutritionTypeModule } from './modules/nutrition_type/nutrition_type.module';
import { HealthStatusModule } from './modules/health_status/heath_status.module';
import { FoodModule } from './modules/food/food.module';
import { MealPlanModule } from './modules/meal_plan/meal_plan.module';
import { FileUploadModule } from './modules/file_upload/file_upload.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    AuthModule,
    ActivityLevelModule,
    ArticleCategoryModule,
    EatingWindowModule,
    FoodTypeModule,
    GoalModule,
    NutritionTypeModule,
    HealthStatusModule,
    FoodModule,
    MealPlanModule,
    FileUploadModule
  ],
})
export class AppModule { }
