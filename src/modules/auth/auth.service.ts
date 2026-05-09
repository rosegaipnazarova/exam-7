import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}
async login(loginDto: any) {
  // findByEmail o'rniga findByLogin
  const user = await this.usersService.findByLogin(loginDto.login);
  
  if (user && await bcrypt.compare(loginDto.password, user.password)) {
    // Payloadga fullName o'rniga firstName va lastName ni qo'shamiz
    const payload = { 
      sub: user.id, 
      login: user.login, 
      role: user.role 
    };
    
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: { 
        id: user.id, 
        fullName: `${user.firstName} ${user.lastName}`, // Shu yerda yasab olamiz
        role: user.role 
      }
    };
  }
  throw new UnauthorizedException('Login yoki parol xato');
}
}