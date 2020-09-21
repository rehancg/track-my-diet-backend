import { IsNotEmpty } from "class-validator";
import { ArticleCategory } from "src/modules/article_category/article_category.entity";
import { User } from "src/modules/user/user.entity";

export class CreateArticleDto {
    @IsNotEmpty()
    title: string;

    title_si: string;

    thumbnail: string;

    image_url: string;

    meta_desc: string;

    meta_desc_en: string;

    body: string

    body_si: string

    status: string

    article_category: ArticleCategory[]

    user: User

}