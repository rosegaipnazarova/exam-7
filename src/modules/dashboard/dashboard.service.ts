import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../students/entities/student.entity';
import { Payment } from '../payments/entities/payment.entity';
import { Group } from '../groups/entities/group.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Student)
    private studentRepo: Repository<Student>,
    @InjectRepository(Payment)
    private paymentRepo: Repository<Payment>,
    @InjectRepository(Group)
    private groupRepo: Repository<Group>,
  ) {}

  async getStats() {
    // 1. Jami o'quvchilar soni
    const totalStudents = await this.studentRepo.count();

    // 2. Jami faol guruhlar soni
    const totalGroups = await this.groupRepo.count();

    // 3. Jami tushum (summa)
    const revenueResult = await this.paymentRepo
      .createQueryBuilder('payment')
      .select('SUM(payment.amount)', 'total')
      .getRawOne();
    
    const totalRevenue = parseFloat(revenueResult.total) || 0;

    // 4. Qarzdor o'quvchilar soni (balansi manfiy bo'lganlar)
    const debtorsCount = await this.studentRepo
      .createQueryBuilder('student')
      .where('student.balance < 0')
      .getCount();

    return {
      totalStudents,
      totalGroups,
      totalRevenue,
      debtorsCount,
    };
  }
}