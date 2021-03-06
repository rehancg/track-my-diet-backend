import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMetaDto } from 'src/shared/dto/create-meta-dto';
import { PatchMetaDto } from 'src/shared/dto/patch-meta-dto';
import { FoodToMealPlanService } from '../food_to_meal_plan/food_to_meal_plan.service';
import { CreateMealPlanDto } from './dto/create_meal_plan.dto';
import { UpdateMealPlanDto } from './dto/update_meal_plan.dto';
import { MealPlan } from './meal_plan.entity';
import { MealPlanRepository } from './meal_plan.repository';

@Injectable()
export class MealPlanService {

    constructor(
        private respository: MealPlanRepository,
        private foodToMealPlanService: FoodToMealPlanService,
    ) { }

    async getAll(): Promise<MealPlan[]> {
        return this.respository.find()
    }

    async getItemById(id: number): Promise<MealPlan> {
        return this.respository.findOne({ where: { id } });
    }

    async createNew(data: CreateMealPlanDto): Promise<MealPlan> {
        return this.respository.createNew(data);
    }

    async updateExisting(data: UpdateMealPlanDto): Promise<MealPlan> {
        const mealPlan = await this.getItemById(data.id);
        for (let elm of data.items) {
            elm.meal_plan = mealPlan;
            await this.foodToMealPlanService.upsert(elm);
        }
        return this.respository.updateExisting(data);
    }

    async detele(data: PatchMetaDto): Promise<void> {
        const result = await this.respository.delete({ id: data.id })
        if (result.affected === 0) throw new NotFoundException(`Meal Plan with ID ${data.id} not found`)
    }

    async deteleMealPlanFood(id: number): Promise<void> {
        const result = await this.foodToMealPlanService.detele(id)
    }
}
