/**
 * Cors middleware.
 * @file CORS 中间件
 */

import {
  Injectable,
  NestMiddleware,
  HttpStatus,
  RequestMethod,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

/**
 * @class CorsMiddleware
 * @classdesc 用于处理 CORS 跨域
 */
@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild',
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'PUT, POST, GET, DELETE, OPTIONS',
    );
    if (req.method === RequestMethod[RequestMethod.OPTIONS]) {
      res.sendStatus(HttpStatus.OK);
    } else {
      next();
    }
  }
}
