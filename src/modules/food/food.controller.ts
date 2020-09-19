
import { Body, Controller, Delete, Get, Patch, Post, ValidationPipe } from "@nestjs/common";
import { CreateFoodDto } from "./dto/create_food.dto";
import { UpdateFoodDto } from "./dto/update_food.dto";
import { Food } from "./food.entity";
import { FoodService } from "./food.service";

@Controller('food')
export class FoodContoller {
    constructor(private service: FoodService) {

    }

    @Get()
    async getAll(): Promise<Food[]> {
        return this.service.getAll();
    }

    @Post()
    async create(@Body(ValidationPipe) data: CreateFoodDto): Promise<Food> {
        return this.service.createNew(data);
    }

    @Patch()
    async update(@Body(ValidationPipe) data: UpdateFoodDto): Promise<Food> {
        return this.service.updateExisting(data);
    }

    @Delete()
    async delete(@Body(ValidationPipe) data: UpdateFoodDto): Promise<void> {
        return this.service.detele(data);
    }

}