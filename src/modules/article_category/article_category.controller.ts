
import { Body, Controller, Delete, Get, Patch, Post, ValidationPipe } from "@nestjs/common";
import { CreateMetaDto } from "src/shared/dto/create-meta-dto";
import { PatchMetaDto } from "src/shared/dto/patch-meta-dto";
import { ArticleCategory } from "./article_category.entity";
import { ArticleCategoryService } from "./article_category.service";

@Controller('meta/article_category')
export class ArticleCategoryContoller {
    constructor(private service: ArticleCategoryService) {

    }

    @Get()
    async getAll(): Promise<ArticleCategory[]> {
        return this.service.getAll();
    }

    @Post()
    async create(@Body(ValidationPipe) data: CreateMetaDto): Promise<ArticleCategory> {
        return this.service.createNew(data);
    }

    @Patch()
    async update(@Body(ValidationPipe) data: PatchMetaDto): Promise<ArticleCategory> {
        return this.service.updateExisting(data);
    }

    @Delete()
    async delete(@Body(ValidationPipe) data: PatchMetaDto): Promise<void> {
        return this.service.detele(data);
    }

}