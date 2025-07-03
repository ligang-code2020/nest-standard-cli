import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('LoggerMiddleware...');
    next();
  }
}

// 函数式中间件用法
/*

export function logger(req: Request, res: Response, next: NextFunction) {
    console.log(`Request...`);
    next();
};

*/
