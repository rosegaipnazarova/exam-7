import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  USER = 'user',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ example: 'Aziza' })
  @Column()
  firstName!: string;

  @ApiProperty({ example: 'Gaipnazarova' })
  @Column()
  lastName!: string;

  @ApiProperty({ example: 'admin_login' })
  @Column({ unique: true })
  login!: string;

  @Column({ select: false }) 
  password!: string;

  @ApiProperty({ enum: UserRole, default: UserRole.USER })
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role!: UserRole;

  @CreateDateColumn()
  createdAt!: Date;
}