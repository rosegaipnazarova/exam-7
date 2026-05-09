import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { StudentsModule } from './modules/students/students.module';
import { GroupsModule } from './modules/groups/groups.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { AttendanceModule } from './modules/attendance/attendance.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';

@Module({
  imports: [
    // 1. .env faylini o'qish uchun sozlama
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // 2. Ma'lumotlar bazasiga ulanish sozlamasi
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.PORT || '4001') ,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || '1226',
      database: process.env.DB_NAME || 'Panel',
      autoLoadEntities: true, // Entity-larni avtomat topish uchun
      synchronize: true,      // Bazada jadvallarni avtomat yaratish uchun
    }),

    // 3. Sizning modullaringiz
    AuthModule,
    UsersModule,
    StudentsModule,
    GroupsModule,
    PaymentsModule,
    AttendanceModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}