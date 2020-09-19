import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMetaDto } from 'src/shared/dto/create-meta-dto';
import { PatchMetaDto } from 'src/shared/dto/patch-meta-dto';
import { HealthStatus } from './health_status.entity';
import { HealthStatusRepository } from './health_status.repository';

@Injectable()
export class HealthStatusService {

    constructor(
        private respository: HealthStatusRepository,
    ) { }

    async getAll(): Promise<HealthStatus[]> {
        return this.respository.find()
    }

    async getItemById(id: number): Promise<HealthStatus> {
        return this.respository.findOne({ where: { id } });
    }

    async createNew(data: CreateMetaDto): Promise<HealthStatus> {
        return this.respository.createNew(data);
    }

    async updateExisting(data: PatchMetaDto): Promise<HealthStatus> {
        return this.respository.updateExisting(data);
    }

    async detele(data: PatchMetaDto): Promise<void> {
        const result = await this.respository.delete({ id: data.id })
        if (result.affected === 0) throw new NotFoundException(`HealthStatus with ID ${data.id} not found`)
    }
}
