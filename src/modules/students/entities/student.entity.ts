import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ example: 'Muxamadiyev Ibroxim' })
  @Column()
  fullName!: string;

  @ApiProperty({ example: '+998900113861' })
  @Column()
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

  @ApiProperty({ example: 'image_url' })
  @Column({ nullable: true })
  image!: string;

  @CreateDateColumn()
  createdAt!: Date;
}