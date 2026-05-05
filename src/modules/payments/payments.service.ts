import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) {}

  async create(createPaymentDto: CreatePaymentDto) {
    const payment = this.paymentRepository.create(createPaymentDto);
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
    await this.paymentRepository.update(id, updatePaymentDto as any);
    return this.findOne(id);
  }

  async remove(id: number) {
    const payment = await this.findOne(id);
    return this.paymentRepository.remove(payment);
  }
}