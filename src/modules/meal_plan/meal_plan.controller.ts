
import { Body, Controller, Delete, Get, Patch, Post, ValidationPipe } from "@nestjs/common";
import { CreateMetaDto } from "src/shared/dto/create-meta-dto";
import { PatchMetaDto } from "src/shared/dto/patch-meta-dto";
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

    @Post()
    async create(@Body(ValidationPipe) data: CreateMealPlanDto): Promise<MealPlan> {
        return this.service.createNew(data);
    }

    @Patch()
    async update(@Body(ValidationPipe) data: UpdateMealPlanDto): Promise<MealPlan> {
        return this.service.updateExisting(data);
    }

    @Delete()
    async delete(@Body(ValidationPipe) data: PatchMetaDto): Promise<void> {
        return this.service.detele(data);
    }

}