import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { FoodToMealPlan } from "../food_to_meal_plan/food_to_meal_plan.entity";
import { FoodType } from "../food_type/food_type.entity";

@Entity()
export class MealPlan extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    name_si: string;

    @Column({ nullable: true })
    image_url: string;

    @Column("decimal", { precision: 5, scale: 2, default: 0, })
    calories: number;

    @Column("decimal", { precision: 5, scale: 2, default: 0, })
    fat: number;

    @Column("decimal", { precision: 5, scale: 2, default: 0, })
    protien: number;

    @Column("decimal", { precision: 5, scale: 2, default: 0, })
    carb: number;

    @Column("decimal", { precision: 5, scale: 2, default: 0, })
    cost: number;

    @Column({ nullable: true })
    with_suppliment: boolean;

    @ManyToOne(type => FoodType, food_type => food_type.id, { eager: true })
    food_type: FoodType

    @OneToMany(type => FoodToMealPlan, food_to_meal_plan => food_to_meal_plan.meal_plan, { eager: true, nullable: true })
    items: FoodToMealPlan[]

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}