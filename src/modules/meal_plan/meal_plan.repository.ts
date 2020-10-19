import { InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";

import { CreateMetaDto } from "src/shared/dto/create-meta-dto";
import { PatchMetaDto } from "src/shared/dto/patch-meta-dto";
import { Logger } from "src/shared/logger";
import { MealPlan } from "./meal_plan.entity";
import { CreateMealPlanDto } from './dto/create_meal_plan.dto'
import { UpdateMealPlanDto } from './dto/update_meal_plan.dto'
import { FoodToMealPlan } from "../food_to_meal_plan/food_to_meal_plan.entity";


@EntityRepository(MealPlan)
export class MealPlanRepository extends Repository<MealPlan>{
    private readonly logger: Logger = Logger.getInstance();

    async createNew(data: CreateMealPlanDto): Promise<MealPlan> {
        const entity = new MealPlan();
        entity.name = data.name;
        entity.name_si = data.name_si;
        entity.food_type = data.food_type;
        entity.items = data.items;

        try {
            await entity.save();
        } catch (error) {
            throw new InternalServerErrorException('Failed to create new Meal Plan');
        }

        return entity;
    }

    async updateExisting(data: UpdateMealPlanDto): Promise<MealPlan> {
        const item = await this.findOne({ where: { id: data.id } });
        if (!item) {
            throw new NotFoundException(`Meal Plan with id ${data.id} not found`);
        }

        item.name = data.name;
        item.name_si = data.name_si;

        item.food_type = data.food_type;

        item.calories = data.items.reduce((total, foodItem) => total + (foodItem.food.calories * foodItem.servings), 0);
        item.fat = data.items.reduce((total, foodItem) => total + (foodItem.food.fat * foodItem.servings), 0);
        item.carbs = data.items.reduce((total, foodItem) => total + (foodItem.food.carb * foodItem.servings), 0);
        item.protien = data.items.reduce((total, foodItem) => total + (foodItem.food.protein * foodItem.servings), 0);
        item.cost = data.items.reduce((total, foodItem) => total + (foodItem.food.cost * foodItem.servings), 0);
        item.with_suppliment = data.items.some(x => x.food.is_supplement);

        await item.save();
        return item;
    }
}