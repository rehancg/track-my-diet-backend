import { InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";

import { CreateMetaDto } from "src/shared/dto/create-meta-dto";
import { PatchMetaDto } from "src/shared/dto/patch-meta-dto";
import { Logger } from "src/shared/logger";
import { EatingWindow } from "./eating_window.entity";

@EntityRepository(EatingWindow)
export class EatingWindowRepository extends Repository<EatingWindow>{
    private readonly logger: Logger = Logger.getInstance();

    async createNew(data: CreateMetaDto): Promise<EatingWindow> {
        const entity = new EatingWindow();
        entity.name = data.name;
        entity.name_si = data.name_si;
        entity.description = data.description;
        entity.description_si = data.description_si;

        try {
            await entity.save();
        } catch (error) {
            throw new InternalServerErrorException('Failed to create new eating window');
        }

        return entity;
    }

    async updateExisting(data: PatchMetaDto): Promise<EatingWindow> {
        const item = await this.findOne({ where: { id: data.id } });
        if (!item) {
            throw new NotFoundException(`Eating window with id ${data.id} not found`);
        }

        item.name = data.name;
        item.name_si = data.name_si;
        item.description = data.description;
        item.description_si = data.description_si;
        await item.save();
        return item;
    }
}