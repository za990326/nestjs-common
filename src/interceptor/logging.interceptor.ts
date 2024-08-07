/**
 * 日志拦截器
 */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    console.log('Before...------------------');
    const http = context.switchToHttp();
    const request = http.getRequest<Request>();
    const content = request.method + '->' + request.url;
    console.log(content);
    const now = Date.now();
    return next
      .handle()
      .pipe(tap((data) => console.log(`After... ${Date.now() - now}ms`)));
  }
}
