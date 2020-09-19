import { InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";

import { CreateMetaDto } from "src/shared/dto/create-meta-dto";
import { PatchMetaDto } from "src/shared/dto/patch-meta-dto";
import { Logger } from "src/shared/logger";
import { ArticleCategory } from "./article_category.entity";

@EntityRepository(ArticleCategory)
export class ArticleCategoryRepository extends Repository<ArticleCategory>{
    private readonly logger: Logger = Logger.getInstance();

    async createNew(data: CreateMetaDto): Promise<ArticleCategory> {
        const entity = new ArticleCategory();
        entity.name = data.name;
        entity.name_si = data.name_si;
        entity.description = data.description;
        entity.description_si = data.description_si;

        try {
            await entity.save();
        } catch (error) {
            throw new InternalServerErrorException('Failed to create new Article Category');
        }

        return entity;
    }

    async updateExisting(data: PatchMetaDto): Promise<ArticleCategory> {
        const item = await this.findOne({ where: { id: data.id } });
        if (!item) {
            throw new NotFoundException(`Article Category with id ${data.id} not found`);
        }

        item.name = data.name;
        item.name_si = data.name_si;
        item.description = data.description;
        item.description_si = data.description_si;
        await item.save();
        return item;
    }
}