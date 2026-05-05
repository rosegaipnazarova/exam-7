import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Student } from '../../students/entities/student.entity';
import { Group } from '../../groups/entities/group.entity';

@Entity('attendance')
export class Attendance {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'date' })
  date!: string;

  @Column({ default: false })
  isPresent!: boolean;

  @ManyToOne(() => Student, (student) => student.attendances)
  student!: Student;

  @ManyToOne(() => Group)
  group!: Group;
}