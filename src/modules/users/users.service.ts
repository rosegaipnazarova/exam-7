import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto'; 
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newAdmin = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
      
      role: createUserDto.role || UserRole.ADMIN, 
    });
    return this.usersRepository.save(newAdmin);
  }

  
  async findByLogin(login: string) {
    return this.usersRepository.findOne({ 
      where: { login }, 
      select: ['id', 'login', 'password', 'role'] 
    });
  }

  async findAll(query: any = {}) {
    const qb = this.usersRepository.createQueryBuilder('user');
    
    if (query.search) {
      qb.andWhere(
        '(user.fullName ILIKE :search OR user.login ILIKE :search)', 
        { search: `%${query.search}%` }
      );
    }

    return await qb.getMany();
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`ID ${id} bo'lgan foydalanuvchi topilmadi`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    
    await this.usersRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return this.usersRepository.remove(user);
  }
}