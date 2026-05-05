import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Group } from '../../groups/entities/group.entity';
import { Payment } from '../../payments/entities/payment.entity';
import { Attendance } from '../../attendance/entities/attendance.entity';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ example: 'Muxamadiyev Ibroxim' })
  @Column()
  fullName!: string;

  @ApiProperty({ example: '+998900113861' })
  @Column({ unique: true })
  phone!: string;

  @ApiProperty({ example: 'Matematika' })
  @Column()
  direction!: string;

  @ApiProperty({ example: 'Otabekov' })
  @Column()
  parentName!: string;

  @ApiProperty({ example: '+998901234567' })
  @Column()
  parentPhone!: string;

  @ApiProperty({ example: 0 })
  @Column({ default: 0 })
  balance!: number;

  @ApiProperty({ example: 'image_url' })
  @Column({ nullable: true })
  image!: string;

  @CreateDateColumn()
  createdAt!: Date;

  // --- Munosabatlar (Relations) ---

  @ManyToMany(() => Group, (group) => group.students)
  groups!: Group[];

  @OneToMany(() => Payment, (payment: Payment) => payment.student)
  payments!: Payment[];

  // Bu yerda (attendance: Attendance) deb yozish 'unknown' xatosini oldini oladi
  @OneToMany(() => Attendance, (attendance: Attendance) => attendance.student)
  attendances!: Attendance[];
}