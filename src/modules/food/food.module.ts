import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodContoller } from './food.controller';
import { FoodRepository } from './food.respository';
import { FoodService } from './food.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([FoodRepository]),
    ],
    controllers: [FoodContoller],
    providers: [FoodService]
})
export class FoodModule { }
