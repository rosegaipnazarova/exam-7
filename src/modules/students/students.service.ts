import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  create(createStudentDto: CreateStudentDto) {
    const newStudent = this.studentRepository.create(createStudentDto);
    return this.studentRepository.save(newStudent);
  }

  async findAll(search?: string) {
    const queryBuilder = this.studentRepository.createQueryBuilder('student');

    if (search) {
      queryBuilder.where(
        '(student.fullName ILIKE :search OR student.phone ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    return await queryBuilder.orderBy('student.createdAt', 'DESC').getMany();
  }

  remove(id: number) {
    return this.studentRepository.delete(id);
  }
}