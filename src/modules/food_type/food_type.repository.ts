import { InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";

import { CreateMetaDto } from "src/shared/dto/create-meta-dto";
import { PatchMetaDto } from "src/shared/dto/patch-meta-dto";
import { Logger } from "src/shared/logger";
import { FoodType } from "./food_type.entity";

@EntityRepository(FoodType)
export class FoodTypeRepository extends Repository<FoodType>{
    private readonly logger: Logger = Logger.getInstance();

    async createNew(data: CreateMetaDto): Promise<FoodType> {
        const entity = new FoodType();
        entity.name = data.name;
        entity.name_si = data.name_si;
        entity.description = data.description;
        entity.description_si = data.description_si;

        try {
            await entity.save();
        } catch (error) {
            throw new InternalServerErrorException('Failed to create new food type');
        }

        return entity;
    }

    async updateExisting(data: PatchMetaDto): Promise<FoodType> {
        const item = await this.findOne({ where: { id: data.id } });
        if (!item) {
            throw new NotFoundException(`Food type with id ${data.id} not found`);
        }

        item.name = data.name;
        item.name_si = data.name_si;
        item.description = data.description;
        item.description_si = data.description_si;
        await item.save();
        return item;
    }
}