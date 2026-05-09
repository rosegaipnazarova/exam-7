import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { Student } from '../students/entities/student.entity'; // Student entity-ni import qiling
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    
    @InjectRepository(Student) // Student repository-ni ham ulang
    private studentRepository: Repository<Student>,
  ) {}

  // Figma mantiqi: To'lov yaratish va balansni yangilash
async create(createPaymentDto: CreatePaymentDto) {
    // studentId ni number turida ekanligini aniq ko'rsatamiz
    const { studentId, amount, ...rest } = createPaymentDto;

    // findOneBy ichida studentId ni oddiy son sifatida uzatamiz
    const student = await this.studentRepository.findOneBy({ 
      id: studentId as number 
    });

    if (!student) {
      throw new NotFoundException(`ID: ${studentId} bo'lgan o'quvchi topilmadi`);
    }

    // Balansni hisoblashda ham primitiv turlardan foydalanamiz
    student.balance = Number(student.balance) + Number(amount);
    await this.studentRepository.save(student);

    const payment = this.paymentRepository.create({
      ...rest,
      amount,
      student,
    });

    return await this.paymentRepository.save(payment);
  }

  async findAll(query: any = {}) {
    const qb = this.paymentRepository.createQueryBuilder('payment')
      .leftJoinAndSelect('payment.student', 'student');

    if (query.studentId) {
      qb.where('student.id = :studentId', { studentId: query.studentId });
    }

    return await qb.orderBy('payment.paidAt', 'DESC').getMany();
  }

  async findOne(id: number) {
    const payment = await this.paymentRepository.findOne({
      where: { id },
      relations: ['student'],
    });
    if (!payment) throw new NotFoundException('To\'lov topilmadi');
    return payment;
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    // Balansga ta'sir qiladigan o'zgarish bo'lsa, bu yerda ham mantiq qo'shish kerak bo'ladi
    await this.paymentRepository.update(id, updatePaymentDto as any);
    return this.findOne(id);
  }

  async remove(id: number) {
    const payment = await this.findOne(id);
    return this.paymentRepository.remove(payment);
  }

  // Dashboard uchun umumiy tushum
  async getTotalRevenue() {
    const result = await this.paymentRepository
      .createQueryBuilder('payment')
      .select('SUM(payment.amount)', 'total')
      .getRawOne();
    return result.total || 0;
  }
}