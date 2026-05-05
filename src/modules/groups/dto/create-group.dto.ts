import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateGroupDto {
  @ApiProperty({ example: 'Backend Node.js' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 'Software Engineering' })
  @IsString()
  direction!: string;

  @ApiProperty({ example: 'Eshmatov Toshmat' })
  @IsString()
  teacherName!: string;

  @ApiProperty({ example: ['Du', 'Chor', 'Ju'] })
  @IsArray()
  days!: string[];

  @ApiProperty({ example: '18:00' })
  @IsString()
  startTime!: string;

  @ApiProperty({ example: '5-xona' })
  @IsString()
  room!: string;
}