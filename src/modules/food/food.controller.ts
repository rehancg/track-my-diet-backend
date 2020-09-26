
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { UserRole } from "../user/user.entity";
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

    @Get('/:id')
    async getById(@Param('id', ParseIntPipe) id: number): Promise<Food> {
        return this.service.getItemById(id);
    }

    @Post()
    @UseGuards(AuthGuard(), RolesGuard)
    @Roles(UserRole.ADMIN)
    async create(@Body(ValidationPipe) data: CreateFoodDto): Promise<Food> {
        return this.service.createNew(data);
    }

    @Patch()
    @UseGuards(AuthGuard(), RolesGuard)
    @Roles(UserRole.ADMIN)
    async update(@Body(ValidationPipe) data: UpdateFoodDto): Promise<Food> {
        return this.service.updateExisting(data);
    }

    @Delete()
    @UseGuards(AuthGuard(), RolesGuard)
    @Roles(UserRole.ADMIN)
    async delete(@Body(ValidationPipe) data: UpdateFoodDto): Promise<void> {
        return this.service.detele(data);
    }

}