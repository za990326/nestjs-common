import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const http = context.switchToHttp();
    const request = http.getRequest<Request>();

    const authorization = request.headers['authorization'] || '';
    const bearer = authorization.split(' ');
    if (!bearer || bearer.length < 2) {
      throw new UnauthorizedException('登录token错误');
    }

    const token = bearer[1];

    try {
      const info = this.jwtService.verify(token);
      console.log(info);
      return true;
    } catch (error) {
      throw new UnauthorizedException('登录 token 失效，请重新登录');
    }
  }
}
