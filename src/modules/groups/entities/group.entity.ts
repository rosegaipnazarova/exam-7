import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Student } from '../../students/entities/student.entity';

@Entity('groups')
export class Group {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string; 

  @Column()
  direction!: string; 

  @Column()
  teacherName!: string;

  @Column('text', { array: true })
  days!: string[]; 

  @Column()
  startTime!: string; 

  @Column()
  room!: string; 

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToMany(() => Student)
  @JoinTable()
  students!: Student[];
}