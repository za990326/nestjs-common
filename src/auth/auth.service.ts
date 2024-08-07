import { HttpException, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as md5 from 'md5';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginAuthDto) {
    const user = await this.prismaService.user.findFirst({
      where: {
        username: loginDto.username,
      },
    });
    if (user) {
      if (user.password !== md5(loginDto.password)) {
        throw new HttpException('密码错误', 200);
      } else {
        if (loginDto.autoLogin) {
          await this.prismaService.user.update({
            where: {
              username: loginDto.username,
            },
            data: {
              flag: loginDto.autoLogin,
            },
          });
        }
        const token = await this.jwtService.signAsync({
          username: user.username,
        });
        return {
          token,
        };
      }
    } else {
      throw new HttpException('用户不存在', 200);
    }
  }
  async register(registerDto: RegisterAuthDto) {
    const user = await this.prismaService.user.findFirst({
      where: {
        username: registerDto.username,
      },
    });

    if (user) {
      throw new HttpException('用户已存在', 200);
    }

    const newUser = await this.prismaService.user.create({
      data: {
        username: registerDto.username,
        password: md5(registerDto.password),
      },
    });
    return newUser;
  }
}
