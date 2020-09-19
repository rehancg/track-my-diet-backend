import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMetaDto } from 'src/shared/dto/create-meta-dto';
import { PatchMetaDto } from 'src/shared/dto/patch-meta-dto';
import { CreateFoodDto } from './dto/create_food.dto';
import { UpdateFoodDto } from './dto/update_food.dto';
import { Food } from './food.entity';
import { FoodRepository } from './food.respository';

@Injectable()
export class FoodService {

    constructor(
        private respository: FoodRepository,
    ) { }

    async getAll(): Promise<Food[]> {
        return this.respository.find()
    }

    async getItemById(id: number): Promise<Food> {
        return this.respository.findOne({ where: { id } });
    }

    async createNew(data: CreateFoodDto): Promise<Food> {
        return this.respository.createNew(data);
    }

    async updateExisting(data: UpdateFoodDto): Promise<Food> {
        return this.respository.updateExisting(data);
    }

    async detele(data: UpdateFoodDto): Promise<void> {
        const result = await this.respository.delete({ id: data.id })
        if (result.affected === 0) throw new NotFoundException(`Food with ID ${data.id} not found`)
    }
}
