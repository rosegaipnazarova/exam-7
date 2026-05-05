import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './entities/group.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private groupsRepository: Repository<Group>,
  ) {}

  async create(createGroupDto: CreateGroupDto) {
    const group = this.groupsRepository.create(createGroupDto);
    return await this.groupsRepository.save(group);
  }

  async findAll(query: any = {}) {
    const qb = this.groupsRepository.createQueryBuilder('group')
      .leftJoinAndSelect('group.students', 'students');

    if (query.search) {
      qb.where('group.name ILIKE :search OR group.teacherName ILIKE :search', {
        search: `%${query.search}%`,
      });
    }

    return await qb.getMany();
  }

  async findOne(id: number) {
    const group = await this.groupsRepository.findOne({
      where: { id },
      relations: ['students'],
    });
    if (!group) throw new NotFoundException('Guruh topilmadi');
    return group;
  }

  async update(id: number, updateGroupDto: UpdateGroupDto) {
    await this.groupsRepository.update(id, updateGroupDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const group = await this.findOne(id);
    return this.groupsRepository.remove(group);
  }
}