// 响应拦截器(成功的响应数据格式)

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface data<T> {
  data: T;
}

@Injectable()
export class ResultInterceptor<T = any> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<data<T>> {
    console.log(next.handle());
    return next.handle().pipe(
      map((data) => {
        return {
          data,
          code: 200,
          success: true,
          msg: '请求成功',
        };
      }),
    );
  }
}
