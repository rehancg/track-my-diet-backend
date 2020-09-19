import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMetaDto } from 'src/shared/dto/create-meta-dto';
import { PatchMetaDto } from 'src/shared/dto/patch-meta-dto';
import { NutritionType } from './nutrition_type.entity';
import { NutritionTypeRepository } from './nutrition_type.repository';

@Injectable()
export class NutritionTypeService {

    constructor(
        private respository: NutritionTypeRepository,
    ) { }

    async getAll(): Promise<NutritionType[]> {
        return this.respository.find()
    }

    async getItemById(id: number): Promise<NutritionType> {
        return this.respository.findOne({ where: { id } });
    }

    async createNew(data: CreateMetaDto): Promise<NutritionType> {
        return this.respository.createNew(data);
    }

    async updateExisting(data: PatchMetaDto): Promise<NutritionType> {
        return this.respository.updateExisting(data);
    }

    async detele(data: PatchMetaDto): Promise<void> {
        const result = await this.respository.delete({ id: data.id })
        if (result.affected === 0) throw new NotFoundException(`NutritionType with ID ${data.id} not found`)
    }
}
