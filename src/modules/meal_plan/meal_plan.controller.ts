
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CreateMetaDto } from "src/shared/dto/create-meta-dto";
import { PatchMetaDto } from "src/shared/dto/patch-meta-dto";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { UserRole } from "../user/user.entity";
import { CreateMealPlanDto } from "./dto/create_meal_plan.dto";
import { UpdateMealPlanDto } from "./dto/update_meal_plan.dto";
import { MealPlan } from "./meal_plan.entity";
import { MealPlanService } from "./meal_plan.service";

@Controller('meal_plan')
export class MealPlanContoller {
    constructor(private service: MealPlanService) {

    }

    @Get()
    async getAll(): Promise<MealPlan[]> {
        return this.service.getAll();
    }

    @Get('/:id')
    async getById(@Param('id', ParseIntPipe) id: number): Promise<MealPlan> {
        return this.service.getItemById(id);
    }

    @Post()
    @UseGuards(AuthGuard(), RolesGuard)
    @Roles(UserRole.ADMIN)
    async create(@Body(ValidationPipe) data: CreateMealPlanDto): Promise<MealPlan> {
        return this.service.createNew(data);
    }

    @Patch()
    @UseGuards(AuthGuard(), RolesGuard)
    @Roles(UserRole.ADMIN)
    async update(@Body(ValidationPipe) data: UpdateMealPlanDto): Promise<MealPlan> {
        return this.service.updateExisting(data);
    }

    @Delete()
    @UseGuards(AuthGuard(), RolesGuard)
    @Roles(UserRole.ADMIN)
    async delete(@Body(ValidationPipe) data: PatchMetaDto): Promise<void> {
        return this.service.detele(data);
    }

    @Delete('/food/:id')
    @UseGuards(AuthGuard(), RolesGuard)
    @Roles(UserRole.ADMIN)
    async deleteMealPlanFood(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.service.deteleMealPlanFood(id);
    }

}