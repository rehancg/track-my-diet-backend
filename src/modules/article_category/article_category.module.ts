import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleCategoryContoller } from './article_category.controller';
import { ArticleCategoryRepository } from './article_category.repository';
import { ArticleCategoryService } from './article_category.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ArticleCategoryRepository]),
    ],
    controllers: [ArticleCategoryContoller],
    providers: [ArticleCategoryService]
})
export class ArticleCategoryModule { }
