import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMetaDto } from 'src/shared/dto/create-meta-dto';
import { PatchMetaDto } from 'src/shared/dto/patch-meta-dto';
import { CreateFoodToMealPlanDto } from './dto/create_food_to_meal_plan.dto';
import { UpdateFoodToMealPlanDto } from './dto/update_food_to_meal_plan.dto';
import { FoodToMealPlan } from './food_to_meal_plan.entity';
import { FoodToMealPlanRepository } from './food_to_meal_plan.repository';

@Injectable()
export class FoodToMealPlanService {

    constructor(
        private respository: FoodToMealPlanRepository,
    ) { }

    async getAll(): Promise<FoodToMealPlan[]> {
        return this.respository.find()
    }

    async getItemById(id: number): Promise<FoodToMealPlan> {
        return this.respository.findOne({ where: { id } });
    }

    async upsert(data: CreateFoodToMealPlanDto): Promise<FoodToMealPlan> {
        if (!data.id) {
            return this.respository.createNew(data);
        } else {
            return this.respository.updateExisting(data);
        }
    }

    async createNew(data: CreateFoodToMealPlanDto): Promise<FoodToMealPlan> {
        return this.respository.createNew(data);
    }

    async updateExisting(data: UpdateFoodToMealPlanDto): Promise<FoodToMealPlan> {
        return this.respository.updateExisting(data);
    }

    async detele(id: number): Promise<void> {
        const result = await this.respository.delete({ id })
        if (result.affected === 0) throw new NotFoundException(`Food for mealplan with ID ${id} not found`)
    }
}
