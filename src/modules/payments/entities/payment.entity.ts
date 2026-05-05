import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Student } from '../../students/entities/student.entity';

export enum PaymentMethod {
  CASH = 'cash',
  CARD = 'card',
  TRANSFER = 'transfer'
}

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount!: number;

  @Column({ type: 'enum', enum: PaymentMethod, default: PaymentMethod.CASH })
  method!: PaymentMethod;

  @Column({ nullable: true })
  comment!: string;

  @CreateDateColumn()
  paidAt!: Date;

  @ManyToOne(() => Student, (student) => student.id, { onDelete: 'CASCADE' })
  student!: Student;
}