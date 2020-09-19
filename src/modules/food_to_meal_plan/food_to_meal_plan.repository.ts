import { InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";

import { Logger } from "src/shared/logger";
import { FoodToMealPlan } from "./food_to_meal_plan.entity";
import { CreateFoodToMealPlanDto } from "./dto/create_food_to_meal_plan.dto";
import { UpdateFoodToMealPlanDto } from "./dto/update_food_to_meal_plan.dto";

@EntityRepository(FoodToMealPlan)
export class FoodToMealPlanRepository extends Repository<FoodToMealPlan>{
    private readonly logger: Logger = Logger.getInstance();

    async createNew(data: CreateFoodToMealPlanDto): Promise<FoodToMealPlan> {
        const entity = new FoodToMealPlan();
        entity.eating_window = data.eating_window;
        entity.food = data.food;
        entity.meal_plan = data.meal_plan

        try {
            await entity.save();
        } catch (error) {
            throw new InternalServerErrorException('Failed to create new Food for mealplan');
        }

        return entity;
    }

    async updateExisting(data: UpdateFoodToMealPlanDto): Promise<FoodToMealPlan> {
        const item = await this.findOne({ where: { id: data.id } });
        if (!item) {
            throw new NotFoundException(`Food for mealplan with id ${data.id} not found`);
        }

        item.eating_window = data.eating_window;
        item.food = data.food;
        item.meal_plan = data.meal_plan

        await item.save();
        return item;
    }
}