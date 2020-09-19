import { InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";

import { CreateMetaDto } from "src/shared/dto/create-meta-dto";
import { PatchMetaDto } from "src/shared/dto/patch-meta-dto";
import { Logger } from "src/shared/logger";
import { NutritionType } from "./nutrition_type.entity";

@EntityRepository(NutritionType)
export class NutritionTypeRepository extends Repository<NutritionType>{
    private readonly logger: Logger = Logger.getInstance();

    async createNew(data: CreateMetaDto): Promise<NutritionType> {
        const entity = new NutritionType();
        entity.name = data.name;
        entity.name_si = data.name_si;
        entity.description = data.description;
        entity.description_si = data.description_si;

        try {
            await entity.save();
        } catch (error) {
            throw new InternalServerErrorException('Failed to create new NutritionType');
        }

        return entity;
    }

    async updateExisting(data: PatchMetaDto): Promise<NutritionType> {
        const item = await this.findOne({ where: { id: data.id } });
        if (!item) {
            throw new NotFoundException(`NutritionType with id ${data.id} not found`);
        }

        item.name = data.name;
        item.name_si = data.name_si;
        item.description = data.description;
        item.description_si = data.description_si;
        await item.save();
        return item;
    }
}