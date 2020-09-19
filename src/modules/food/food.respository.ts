import { InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";

import { Logger } from "src/shared/logger";
import { Food } from "./food.entity";
import { CreateFoodDto } from "./dto/create_food.dto";
import { UpdateFoodDto } from "./dto/update_food.dto";

@EntityRepository(Food)
export class FoodRepository extends Repository<Food>{
    private readonly logger: Logger = Logger.getInstance();

    async createNew(data: CreateFoodDto): Promise<Food> {
        const entity = new Food();
        entity.calories = data.calories;
        entity.carb = data.carb;
        entity.cost = data.cost;
        entity.eating_window = data.eating_window;
        entity.fat = data.fat;
        entity.food_type = data.food_type;
        entity.health_status = data.health_status;
        entity.image_url = data.image_url;
        entity.is_budget = data.is_budget;
        entity.name = data.name;
        entity.name_si = data.name_si;
        entity.nutrition_type = data.nutrition_type;
        entity.protein = data.protein;
        entity.serving_size = data.serving_size;
        entity.serving_unit = data.serving_unit;

        try {
            await entity.save();
        } catch (error) {
            throw new InternalServerErrorException('Failed to create new Food');
        }

        return entity;
    }

    async updateExisting(data: UpdateFoodDto): Promise<Food> {
        const item = await this.findOne({ where: { id: data.id } });
        if (!item) {
            throw new NotFoundException(`Food with id ${data.id} not found`);
        }

        item.calories = data.calories;
        item.carb = data.carb;
        item.cost = data.cost;
        item.eating_window = data.eating_window;
        item.fat = data.fat;
        item.food_type = data.food_type;
        item.health_status = data.health_status;
        item.image_url = data.image_url;
        item.is_budget = data.is_budget;
        item.name = data.name;
        item.name_si = data.name_si;
        item.nutrition_type = data.nutrition_type;
        item.protein = data.protein;
        item.serving_size = data.serving_size;
        item.serving_unit = data.serving_unit;
        await item.save();
        return item;
    }
}