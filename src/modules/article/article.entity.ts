import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ArticleCategory } from "../article_category/article_category.entity";
import { User } from "../user/user.entity";

@Entity()
export class Article extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    title_si: string;

    @Column({ nullable: true })
    thumbnail: string;

    @Column({ nullable: true })
    image_url: string;

    @Column()
    meta_desc: string;

    @Column()
    meta_desc_en: string;

    @Column()
    body: string

    @Column()
    body_si: string

    @Column({ nullable: true })
    status: string

    @ManyToMany(type => ArticleCategory)
    @JoinTable()
    article_category: ArticleCategory[]

    @ManyToOne(type => User, user => user.id)
    user: User

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}