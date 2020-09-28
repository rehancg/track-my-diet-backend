import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateMetaDto } from 'src/shared/dto/create-meta-dto';
import { PatchMetaDto } from 'src/shared/dto/patch-meta-dto';
import { Logger } from 'src/shared/logger';
import { EntityRepository, Repository } from 'typeorm';
import { ActivityLevel } from './activity_level.entity';

@EntityRepository(ActivityLevel)
export class ActivityLevelRepository extends Repository<ActivityLevel> {
  private readonly logger: Logger = Logger.getInstance();

  async createNew(data: CreateMetaDto): Promise<ActivityLevel> {
    const al = new ActivityLevel();
    al.name = data.name;
    al.name_si = data.name_si;
    al.description = data.description;
    al.description_si = data.description_si;
    al.value = data.value;
    try {
      await al.save();
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to create new activity level',
      );
    }

    return al;
  }

  async updateExisting(data: PatchMetaDto): Promise<ActivityLevel> {
    const item = await this.findOne({ where: { id: data.id } });
    if (!item) {
      throw new NotFoundException(`Activity Level with id ${data.id}`);
    }

    item.name = data.name;
    item.name_si = data.name_si;
    item.description = data.description;
    item.description_si = data.description_si;
    item.value = data.value;
    await item.save();
    return item;
  }
}
