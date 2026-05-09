import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from './entities/attendance.entity';
import { Student } from '../students/entities/student.entity';
import { Group } from '../groups/entities/group.entity';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepo: Repository<Attendance>,
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
    @InjectRepository(Group)
    private readonly groupRepo: Repository<Group>,
  ) {}

  async create(createAttendanceDto: CreateAttendanceDto) {
    const { studentId, groupId, status, date } = createAttendanceDto;

    // 1. O'quvchi va Guruhni topamiz
    const student = await this.studentRepo.findOneBy({ id: studentId as any });
    const group = await this.groupRepo.findOneBy({ id: groupId as any });

    if (!student || !group) {
      throw new NotFoundException('O\'quvchi yoki Guruh topilmadi');
    }

    // 2. Figma Mantiqi: Davomat olinganda balansdan pul yechish
    if (status === 'present') {
      // Guruh narxini (price) darslar soniga bo'lamiz (masalan 12 ta dars)
      const groupPrice = (group as any).price || 0;
      const lessonPrice = Number(groupPrice) / 12;
      
      student.balance = Number(student.balance) - lessonPrice;
      await this.studentRepo.save(student);
    }

    // 3. Davomatni saqlash (Date xatosini hal qilish uchun stringga o'tkazamiz)
    const attendance = this.attendanceRepo.create({
      ...createAttendanceDto,
      student: { id: studentId } as any,
      group: { id: groupId } as any,
      date: date ? new Date(date).toISOString() : new Date().toISOString(),
    } as any);

    return await this.attendanceRepo.save(attendance);
  }

  async findAll() {
    return await this.attendanceRepo.find({
      relations: ['student', 'group'],
      order: { id: 'DESC' }
    });
  }

  async findOne(id: number) {
    const attendance = await this.attendanceRepo.findOne({
      where: { id },
      relations: ['student', 'group'],
    });
    if (!attendance) throw new NotFoundException(`ID ${id} bo'lgan davomat topilmadi`);
    return attendance;
  }

  async update(id: number, updateAttendanceDto: UpdateAttendanceDto) {
    // Sanani to'g'ri formatga o'tkazamiz
    const updateData: any = { ...updateAttendanceDto };
    if (updateData.date) {
      updateData.date = new Date(updateData.date).toISOString();
    }

    await this.attendanceRepo.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number) {
    const attendance = await this.findOne(id);
    if (!attendance) throw new NotFoundException('not found');
    return await this.attendanceRepo.remove(attendance);
  }
}