import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NutritionTypeRepository } from './nutrition_type.repository';
import { NutritionTypeService } from './nutrition_type.service';
import { NutritionTypeController } from './nutrition_type.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([NutritionTypeRepository]),
        AuthModule
    ],
    controllers: [NutritionTypeController],
    providers: [NutritionTypeService]
})
export class NutritionTypeModule { }
