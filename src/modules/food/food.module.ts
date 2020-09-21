import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { FoodContoller } from './food.controller';
import { FoodRepository } from './food.respository';
import { FoodService } from './food.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([FoodRepository]),
        AuthModule
    ],
    controllers: [FoodContoller],
    providers: [FoodService]
})
export class FoodModule { }
