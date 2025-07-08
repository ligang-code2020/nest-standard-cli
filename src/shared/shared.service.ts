import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SharedService {
  constructor(private configService: ConfigService) {}
  findAll() {
    const HELLO_MESSAGE = this.configService.get<string>('db.mysql.password');

    return new Promise((resolve) => {
      setTimeout(resolve, 6000, 'This will time out');
    });

    // throw new Error('This is a test error');
  }
}
