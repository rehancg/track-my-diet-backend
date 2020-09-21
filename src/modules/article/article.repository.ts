import { InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";

import { CreateMetaDto } from "src/shared/dto/create-meta-dto";
import { PatchMetaDto } from "src/shared/dto/patch-meta-dto";
import { Logger } from "src/shared/logger";
import { Article } from "./article.entity";
import { CreateArticleDto } from "./dto/create-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";

@EntityRepository(Article)
export class ArticleRepository extends Repository<Article>{
    private readonly logger: Logger = Logger.getInstance();

    async createNew(data: CreateArticleDto): Promise<Article> {
        const entity = new Article();
        entity.article_category = data.article_category;
        entity.body = data.body;
        entity.body_si = data.body_si;
        entity.image_url = data.image_url;
        entity.meta_desc = data.meta_desc;
        entity.meta_desc_en = data.meta_desc_en;
        entity.status = data.status;
        entity.thumbnail = data.thumbnail;
        entity.title = data.title;
        entity.title_si = data.title_si;
        entity.user = data.user;

        try {
            await entity.save();
        } catch (error) {
            throw new InternalServerErrorException('Failed to create new Article Category');
        }

        return entity;
    }

    async updateExisting(data: UpdateArticleDto): Promise<Article> {
        const item = await this.findOne({ where: { id: data.id } });
        if (!item) {
            throw new NotFoundException(`Article Category with id ${data.id} not found`);
        }

        item.article_category = data.article_category;
        item.body = data.body;
        item.body_si = data.body_si;
        item.image_url = data.image_url;
        item.meta_desc = data.meta_desc;
        item.meta_desc_en = data.meta_desc_en;
        item.status = data.status;
        item.thumbnail = data.thumbnail;
        item.title = data.title;
        item.title_si = data.title_si;
        item.user = data.user;

        await item.save();
        return item;
    }
}