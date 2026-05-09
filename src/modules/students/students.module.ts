import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { Student } from './entities/student.entity'; // Student entity-ni import qiling

@Module({
  imports: [
    // Mana shu qator Student repository-ni modulga ulab beradi
    TypeOrmModule.forFeature([Student]),
  ],
  controllers: [StudentsController],
  providers: [StudentsService],
  exports: [StudentsService, TypeOrmModule], // Boshqa modullar (masalan, Payments) ishlatishi uchun
})
export class StudentsModule {}