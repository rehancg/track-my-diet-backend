import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMetaDto } from 'src/shared/dto/create-meta-dto';
import { PatchMetaDto } from 'src/shared/dto/patch-meta-dto';
import { FoodType } from './food_type.entity';
import { FoodTypeRepository } from './food_type.repository';

@Injectable()
export class FoodTypeService {

    constructor(
        private respository: FoodTypeRepository,
    ) { }

    async getAll(): Promise<FoodType[]> {
        return this.respository.find()
    }

    async getItemById(id: number): Promise<FoodType> {
        return this.respository.findOne({ where: { id } });
    }

    async createNew(data: CreateMetaDto): Promise<FoodType> {
        return this.respository.createNew(data);
    }

    async updateExisting(data: PatchMetaDto): Promise<FoodType> {
        return this.respository.updateExisting(data);
    }

    async detele(data: PatchMetaDto): Promise<void> {
        const result = await this.respository.delete({ id: data.id })
        if (result.affected === 0) throw new NotFoundException(`Food type with ID ${data.id} not found`)
    }
}
