import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMetaDto } from 'src/shared/dto/create-meta-dto';
import { PatchMetaDto } from 'src/shared/dto/patch-meta-dto';
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

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private respository: UserRepository,
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

    if (data.weight && data.height && !data.calory_requirement) {
      const { TDEE } = calculateTDEE(
        (data.gender as unknown) as GENDER,
        data.weight,
        data.height,
        data.age,
        1.3,
      );
      const BMI = calculateBMI(data.height, data.weight);
    }
    return this.respository.createNew(data);
  }

  async updateExisting(data: UpdateUserDto): Promise<User> {
    return this.respository.updateExisting(data);
  }

  async detele(data: UpdateUserDto): Promise<void> {
    const result = await this.respository.delete({ id: data.id });
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${data.id} not found`);
    }
  }
}
