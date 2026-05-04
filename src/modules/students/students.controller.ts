import { Controller, Get, Post, Body, Query, UseGuards, Delete, Param } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { ApiTags, ApiOperation, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from '../../common/guards/roles.guard';

@ApiTags('O\'quvchilar (Students)')
@ApiBearerAuth()
@UseGuards(RolesGuard) 
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi o\'quvchi qo\'shish' })
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Get()
  @ApiOperation({ summary: 'O\'quvchilarni ko\'rish va qidirish' })
  @ApiQuery({ name: 'search', required: false, description: 'Ism yoki tel bo\'yicha qidiruv' })
  findAll(@Query('search') search: string) {
    return this.studentsService.findAll(search);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(+id);
  }
}