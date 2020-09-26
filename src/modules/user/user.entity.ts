import { BaseEntity, Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { ActivityLevel } from "../activity_level/activity_level.entity";
import { FoodType } from "../food_type/food_type.entity";
import { Goal } from "../goal/goal.entity";
import { HealthStatus } from "../health_status/health_status.entity";

export enum UserRole {
    ADMIN = "admin",
    TESTER = "tester",
    IDEA_MART = "ideamart",
    M_SPACE = "mSpace",
    GUESS = "guess"
}

export enum Gender {
    MALE = "male",
    FEMALE = "female"
}

export enum SubscriptionStatus {
    REGISTERED = "REGISTERED",
    UNREGISTERED = "UNREGISTERED",
    PENDING_CHARGE = "PENDING CHARGE",
    INITIAL_CHARGING_PENDING = "INITIAL CHARGING PENDING"
}

@Entity()
@Unique(['telNo'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    telNo: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.GUESS
    })
    role: UserRole;

    @Column({ nullable: true })
    msisdn: string;

    @Column({
        type: "enum",
        enum: SubscriptionStatus,
        nullable: true
    })
    subscriptionStatus: SubscriptionStatus;

    @Column({ nullable: true })
    refreshToken: string;

    @Column({ nullable: true, type: 'decimal' })
    height: number;

    @Column({ nullable: true, type: 'decimal' })
    weight: number;

    @Column({ nullable: true })
    age: number;

    @Column({
        type: "enum",
        enum: Gender,
        nullable: true
    })
    gender: Gender;

    @Column({ nullable: true })
    language: string;

    @Column({ nullable: true, type: 'decimal' })
    bmi: number;

    @Column({ nullable: true, type: 'decimal' })
    ideal_weight: number;

    @Column({ nullable: true, type: 'decimal' })
    calory_requirement: number;

    @ManyToOne(type => ActivityLevel, activity_level => activity_level.id)
    activity_level: ActivityLevel;

    @ManyToOne(type => FoodType, food_type => food_type.id)
    food_type: FoodType;

    @ManyToOne(type => Goal, goal => goal.id)
    goal: Goal;


    @ManyToOne(type => HealthStatus, health_status => health_status.id, { eager: true })
    health_status: HealthStatus

}