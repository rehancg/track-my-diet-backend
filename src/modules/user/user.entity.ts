import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { ActivityLevel } from "../activity_level/activity_level.entity";
import { FoodType } from "../food_type/food_type.entity";
import { Goal } from "../goal/goal.entity";

@Entity()
@Unique(['telNo'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    telNo: string;

    @Column({ nullable: true })
    msisdn: string;

    @Column({ nullable: true })
    isVip: boolean;

    @Column({ nullable: true, type: 'decimal' })
    height: number;

    @Column({ nullable: true, type: 'decimal' })
    weight: number;

    @Column({ nullable: true })
    age: number;

    @Column({ nullable: true })
    gender: string;

    @Column({ nullable: true })
    language: string;

    @ManyToOne(type => ActivityLevel, activity_level => activity_level.id)
    activity_level: ActivityLevel;

    @ManyToOne(type => FoodType, food_type => food_type.id)
    food_type: FoodType;

    @ManyToOne(type => Goal, goal => goal.id)
    goal: FoodType;
}