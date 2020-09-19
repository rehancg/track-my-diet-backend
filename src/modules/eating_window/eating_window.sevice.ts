import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMetaDto } from 'src/shared/dto/create-meta-dto';
import { PatchMetaDto } from 'src/shared/dto/patch-meta-dto';
import { EatingWindowRepository } from './eating.window.repository';
import { EatingWindow } from './eating_window.entity';

@Injectable()
export class EatingWindowService {

    constructor(
        private respository: EatingWindowRepository,
    ) { }

    async getAll(): Promise<EatingWindow[]> {
        return this.respository.find()
    }

    async getItemById(id: number): Promise<EatingWindow> {
        return this.respository.findOne({ where: { id } });
    }

    async createNew(data: CreateMetaDto): Promise<EatingWindow> {
        return this.respository.createNew(data);
    }

    async updateExisting(data: PatchMetaDto): Promise<EatingWindow> {
        return this.respository.updateExisting(data);
    }

    async detele(data: PatchMetaDto): Promise<void> {
        const result = await this.respository.delete({ id: data.id })
        if (result.affected === 0) throw new NotFoundException(`Eating window with ID ${data.id} not found`)
    }
}
