import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../../modules/users/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user; 

    if (!user) {
      throw new ForbiddenException("Foydalanuvchi aniqlanmadi");
    }

    // Super Admin yoki Admin bo'lsa ruxsat berish
    const hasRole = user.role === UserRole.ADMIN || user.role === UserRole.SUPER_ADMIN;

    if (!hasRole) {
      throw new ForbiddenException("Ushbu bo'limga faqat adminlar kira oladi");
    }

    return true;
  }
}