import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { EatingWindow } from "../eating_window/eating_window.entity";
import { FoodToMealPlan } from "../food_to_meal_plan/food_to_meal_plan.entity";
import { FoodType } from "../food_type/food_type.entity";
import { HealthStatus } from "../health_status/health_status.entity";
import { NutritionType } from "../nutrition_type/nutrition_type.entity";

@Entity()
export class Food extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    name_si: string;

    @Column({ nullable: true })
    thumbnail: string;

    @Column({ nullable: true })
    image_url: string;

    @Column()
    serving_unit: string;

    @Column("decimal", { precision: 8, scale: 2, default: 0, })
    serving_size: number;

    @Column("decimal", { precision: 8, scale: 2, default: 0, })
    calories: number;

    @Column("decimal", { precision: 8, scale: 2, default: 0, })
    protein: number;

    @Column("decimal", { precision: 8, scale: 2, default: 0, })
    fat: number;

    @Column("decimal", { precision: 8, scale: 2, default: 0, })
    carb: number;

    @Column("decimal", { precision: 8, scale: 2, default: 0, })
    cost: number;

    @Column()
    is_budget: boolean;

    @Column({ nullable: true })
    is_supplement: boolean;

    @ManyToOne(type => NutritionType, nutrition_type => nutrition_type.id, { eager: true })
    nutrition_type: NutritionType

    @ManyToOne(type => EatingWindow, eating_window => eating_window.id, { eager: true })
    eating_window: EatingWindow

    @OneToMany(type => FoodToMealPlan, food_to_meal_plan => food_to_meal_plan.id)
    food_to_meal_plan: FoodToMealPlan[]

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}