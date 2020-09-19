import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMetaDto } from 'src/shared/dto/create-meta-dto';
import { PatchMetaDto } from 'src/shared/dto/patch-meta-dto';
import { ArticleCategory } from './article_category.entity';
import { ArticleCategoryRepository } from './article_category.repository';

@Injectable()
export class ArticleCategoryService {

    constructor(
        private respository: ArticleCategoryRepository,
    ) { }

    async getAll(): Promise<ArticleCategory[]> {
        return this.respository.find()
    }

    async getItemById(id: number): Promise<ArticleCategory> {
        return this.respository.findOne({ where: { id } });
    }

    async createNew(data: CreateMetaDto): Promise<ArticleCategory> {
        return this.respository.createNew(data);
    }

    async updateExisting(data: PatchMetaDto): Promise<ArticleCategory> {
        return this.respository.updateExisting(data);
    }

    async detele(data: PatchMetaDto): Promise<void> {
        const result = await this.respository.delete({ id: data.id })
        if (result.affected === 0) throw new NotFoundException(`Article category with ID ${data.id} not found`)
    }
}
