import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { EatingWindow } from "../eating_window/eating_window.entity";
import { Food } from "../food/food.entity";
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

    @ManyToOne(type => FoodType, food_type => food_type.id, { eager: true })
    food_type: FoodType

    @OneToMany(type => FoodToMealPlan, food_to_meal_plan => food_to_meal_plan.id, { eager: true })
    items: FoodToMealPlan[]

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}