import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { FoodTypeContoller } from './food_type.controller';
import { FoodTypeRepository } from './food_type.repository';
import { FoodTypeService } from './food_type.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([FoodTypeRepository]),
        AuthModule
    ],
    controllers: [FoodTypeContoller],
    providers: [FoodTypeService]
})
export class FoodTypeModule { }
