import { Injectable, NotFoundException } from '@nestjs/common';
import { Article } from './article.entity';
import { ArticleRepository } from './article.repository';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticleService {

    constructor(
        private respository: ArticleRepository,
    ) { }

    async getAll(): Promise<Article[]> {
        return this.respository.find()
    }

    async getItemById(id: number): Promise<Article> {
        return this.respository.findOne({ where: { id } });
    }

    async createNew(data: CreateArticleDto): Promise<Article> {
        return this.respository.createNew(data);
    }

    async updateExisting(data: UpdateArticleDto): Promise<Article> {
        return this.respository.updateExisting(data);
    }

    async detele(data: UpdateArticleDto): Promise<void> {
        const result = await this.respository.delete({ id: data.id })
        if (result.affected === 0) throw new NotFoundException(`Article with ID ${data.id} not found`)
    }
}
