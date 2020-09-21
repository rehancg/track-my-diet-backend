import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { ArticleContoller } from './article.controller';
import { ArticleRepository } from './article.repository';
import { ArticleService } from './article.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ArticleRepository]),
        AuthModule
    ],
    controllers: [ArticleContoller],
    providers: [ArticleService]
})
export class ArticleModule { }
