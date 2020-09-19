import { InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";

import { CreateMetaDto } from "src/shared/dto/create-meta-dto";
import { PatchMetaDto } from "src/shared/dto/patch-meta-dto";
import { Logger } from "src/shared/logger";
import { Goal } from "./goal.entity";

@EntityRepository(Goal)
export class GoalRepository extends Repository<Goal>{
    private readonly logger: Logger = Logger.getInstance();

    async createNew(data: CreateMetaDto): Promise<Goal> {
        const entity = new Goal();
        entity.name = data.name;
        entity.name_si = data.name_si;
        entity.description = data.description;
        entity.description_si = data.description_si;

        try {
            await entity.save();
        } catch (error) {
            throw new InternalServerErrorException('Failed to create new goal');
        }

        return entity;
    }

    async updateExisting(data: PatchMetaDto): Promise<Goal> {
        const item = await this.findOne({ where: { id: data.id } });
        if (!item) {
            throw new NotFoundException(`Goal with id ${data.id} not found`);
        }

        item.name = data.name;
        item.name_si = data.name_si;
        item.description = data.description;
        item.description_si = data.description_si;
        await item.save();
        return item;
    }
}