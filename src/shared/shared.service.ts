import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SharedService {
  constructor(private configService: ConfigService) {}
  findAll() {
    const HELLO_MESSAGE = this.configService.get<string>('db.mysql.password');
    // return `This action returns all ${HELLO_MESSAGE}`;
    const aa = 1;
    console.log(aa);
    JSON.parse('a');
    // throw new Error('This is a test error');
  }
}
