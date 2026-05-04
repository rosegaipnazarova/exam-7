import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { StudentsModule } from './modules/students/students.module';

@Module({
  imports: [AuthModule, UsersModule, StudentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
