import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { EatingWindow } from "../eating_window/eating_window.entity";
import { Food } from "../food/food.entity";
import { MealPlan } from "../meal_plan/meal_plan.entity";

@Entity()
export class FoodToMealPlan extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    servings: number;

    @ManyToOne(type => EatingWindow, eating_window => eating_window.id)
    eating_window: EatingWindow;

    @ManyToOne(type => Food, food => food.id, { eager: true })
    food: Food;

    @ManyToOne(type => MealPlan, meal_plan => meal_plan.id)
    meal_plan: MealPlan;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}