import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
  HttpStatus,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface Response<T> {
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T>> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response<T>>();

    // 将POST默认httpCode(201)改为200
    // if (request.method === 'POST') {
    //   if (context.switchToHttp().getResponse().statusCode === 201) {
    //     context.switchToHttp().getResponse().statusCode = HttpStatus.OK;
    //   }
    // }

    return next.handle().pipe(
      map((data) => {
        return {
          statusCode: HttpStatus.OK,
          message: '请求成功',
          data,
        };
      }),
    );
  }
}
