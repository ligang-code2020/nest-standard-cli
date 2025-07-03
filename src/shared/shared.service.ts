import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SharedService {
  constructor(private configService: ConfigService) {}
  findAll() {
    const HELLO_MESSAGE = this.configService.get<string>('db.mysql.password');
    return `This action returns all ${HELLO_MESSAGE}`;
  }
}
