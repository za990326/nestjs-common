import { Body, Controller, Get, Request, Response, Post } from '@nestjs/common';
import { UserService } from './user.service';
import * as svgCaptcha from 'svg-captcha';
import { LoginGuard } from '../login.guard';
import { UseGuards } from '@nestjs/common';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  @UseGuards(LoginGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Get('code')
  getCode(@Request() req: any, @Response() res: any) {
    const captcha = svgCaptcha.create({
      size: 4, // 验证码长度
      ignoreChars: '0o1i', // 验证码字符中排除 0o1i
      noise: 2, // 干扰线条的数量
      fontSize: 50,
      width: 100,
      height: 34,
      background: '#cc9966', // 验证码背景颜色
    });
    req.session.code = captcha.text;
    res.type('image/svg+xml');
    res.send(captcha.data);
  }

  // 验证用户名、密码和验证码
  @Post('create')
  createUser(@Request() req: any, @Body() body: any) {
    // console.log(req, body);
    if (req.session.code.toLowerCase() === body.code.toLowerCase()) {
      return {
        message: '验证码正确',
      };
    }
    return {
      code: '1',
      message: '验证码错误',
    };
  }
}
