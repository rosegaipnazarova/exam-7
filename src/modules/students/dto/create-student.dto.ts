import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStudentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phone!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  direction!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  parentName!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  parentPhone!: string;
}