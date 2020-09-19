import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMetaDto } from 'src/shared/dto/create-meta-dto';
import { PatchMetaDto } from 'src/shared/dto/patch-meta-dto';
import { Goal } from './goal.entity';
import { GoalRepository } from './goal.repository';

@Injectable()
export class GoalService {

    constructor(
        private respository: GoalRepository,
    ) { }

    async getAll(): Promise<Goal[]> {
        return this.respository.find()
    }

    async getItemById(id: number): Promise<Goal> {
        return this.respository.findOne({ where: { id } });
    }

    async createNew(data: CreateMetaDto): Promise<Goal> {
        return this.respository.createNew(data);
    }

    async updateExisting(data: PatchMetaDto): Promise<Goal> {
        return this.respository.updateExisting(data);
    }

    async detele(data: PatchMetaDto): Promise<void> {
        const result = await this.respository.delete({ id: data.id })
        if (result.affected === 0) throw new NotFoundException(`Goal with ID ${data.id} not found`)
    }
}
