import { InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";

import { Logger } from "src/shared/logger";
import { User } from "./user.entity";
import { CreateUserDto } from "./dto/create_user.dto";
import { UpdateUserDto } from "./dto/update_user.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    private readonly logger: Logger = Logger.getInstance();

    async createNew(data: CreateUserDto): Promise<User> {
        const entity = new User();
        entity.activity_level = data.activity_level;
        entity.age = data.age;
        entity.bmi = data.bmi;
        entity.calory_requirement = data.calory_requirement;
        entity.food_type = data.food_type;
        entity.gender = data.gender;
        entity.goal = data.goal;
        entity.height = data.height;
        entity.ideal_weight = data.ideal_weight;
        entity.isVip = data.isVip;
        entity.language = data.language;
        entity.msisdn = data.msisdn;

        try {
            await entity.save();
        } catch (error) {
            throw new InternalServerErrorException('Failed to create new User');
        }

        return entity;
    }

    async updateExisting(data: UpdateUserDto): Promise<User> {
        const item = await this.findOne({ where: { id: data.id } });
        if (!item) {
            throw new NotFoundException(`User with id ${data.id} not found`);
        }

        item.activity_level = data.activity_level;
        item.age = data.age;
        item.bmi = data.bmi;
        item.calory_requirement = data.calory_requirement;
        item.food_type = data.food_type;
        item.gender = data.gender;
        item.goal = data.goal;
        item.height = data.height;
        item.ideal_weight = data.ideal_weight;
        item.isVip = data.isVip;
        item.language = data.language;
        item.msisdn = data.msisdn;


        await item.save();
        return item;
    }
}