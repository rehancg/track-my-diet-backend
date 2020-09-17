import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMetaDto } from 'src/shared/dto/create-meta-dto';
import { PatchMetaDto } from 'src/shared/dto/patch-meta-dto';
import { ActivityLevel } from './activity_level.entity';
import { ActivityLevelRepository } from './activity_level.repository';

@Injectable()
export class ActivityLevelService {

    constructor(
        private activityLevelRepository: ActivityLevelRepository,
    ) { }

    async getAll(): Promise<ActivityLevel[]> {
        return this.activityLevelRepository.find()
    }

    async getItemById(id: number): Promise<ActivityLevel> {
        return this.activityLevelRepository.findOne({ where: { id } });
    }

    async createNew(data: CreateMetaDto): Promise<ActivityLevel> {
        return this.activityLevelRepository.createNew(data);
    }

    async updateExisting(data: PatchMetaDto): Promise<ActivityLevel> {
        return this.activityLevelRepository.updateExisting(data);
    }

    async detele(data: PatchMetaDto): Promise<void> {
        const result = await this.activityLevelRepository.delete({ id: data.id })
        if (result.affected === 0) throw new NotFoundException(`Activity Level with ID ${data.id} not found`)
    }
}
