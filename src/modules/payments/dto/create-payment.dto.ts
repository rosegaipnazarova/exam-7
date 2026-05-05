import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { PaymentMethod } from '../entities/payment.entity';

export class CreatePaymentDto {
  @ApiProperty({ example: 500000 })
  @IsNumber()
  amount!: number;

  @ApiProperty({ enum: PaymentMethod })
  @IsEnum(PaymentMethod)
  method!: PaymentMethod;

  @ApiProperty({ example: 'May oyi uchun to\'lov' })
  @IsString()
  @IsOptional()
  comment!: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  student: any; 
}