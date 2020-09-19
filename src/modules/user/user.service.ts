import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMetaDto } from 'src/shared/dto/create-meta-dto';
import { PatchMetaDto } from 'src/shared/dto/patch-meta-dto';
import { CreateUserDto } from './dto/create_user.dto';
import { UpdateUserDto } from './dto/update_user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {

    constructor(
        private respository: UserRepository,
    ) { }

    async getAll(): Promise<User[]> {
        return this.respository.find()
    }

    async getItemById(id: number): Promise<User> {
        return this.respository.findOne({ where: { id } });
    }

    async createNew(data: CreateUserDto): Promise<User> {
        return this.respository.createNew(data);
    }

    async updateExisting(data: UpdateUserDto): Promise<User> {
        return this.respository.updateExisting(data);
    }

    async detele(data: PatchMetaDto): Promise<void> {
        const result = await this.respository.delete({ id: data.id })
        if (result.affected === 0) throw new NotFoundException(`User with ID ${data.id} not found`)
    }
}
