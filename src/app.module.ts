import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { StudentsModule } from './modules/students/students.module';
import { GroupsModule } from './modules/groups/groups.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { AttendanceModule } from './modules/attendance/attendance.module';

@Module({
  imports: [AuthModule, UsersModule, StudentsModule, GroupsModule, PaymentsModule, AttendanceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
