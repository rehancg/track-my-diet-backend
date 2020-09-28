import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create_user.dto';
import { UpdateUserDto } from './dto/update_user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import {
  calculateTDEE,
  calculateBMR,
  calculateBMI,
} from 'src/shared/util/utilities';
import { GENDER } from 'src/shared/constant';
import { ActivityLevelService } from '../activity_level/activity_level.service';
import { ActivityLevel } from '../activity_level/activity_level.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private respository: UserRepository,
    private activityLevelService: ActivityLevelService,
  ) {}

  async getAll(): Promise<User[]> {
    return this.respository.find();
  }

  async getUserById(id: number): Promise<User> {
    return this.respository.findOne({ where: { id } });
  }

  async getUserByMsidn(msisdn: string): Promise<User> {
    return this.respository.findOne({ where: { msisdn } });
  }

  async getUserByTelNo(telNo: string): Promise<User> {
    return this.respository.findOne({ where: { telNo } });
  }

  async upsert(data: CreateUserDto): Promise<User> {
    if (data.id) {
      return this.respository.updateExisting(data);
    }

    return this.respository.createNew(data);
  }

  async updateExisting(data: UpdateUserDto): Promise<User> {
    if (data.weight && data.height && !data.calory_requirement) {
      const activityLevel: ActivityLevel = await this.activityLevelService.getItemById(
        data.activity_level as any,
      );
      const { TDEE } = calculateTDEE(
        (data.gender as unknown) as GENDER,
        data.weight,
        data.height,
        data.age,
        activityLevel.value,
      );
      const BMI = calculateBMI(data.height, data.weight);
      data.bmi = BMI;
      data.calory_requirement = TDEE;
    }
    return this.respository.updateExisting(data);
  }

  async detele(data: UpdateUserDto): Promise<void> {
    const result = await this.respository.delete({ id: data.id });
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${data.id} not found`);
    }
  }
}
