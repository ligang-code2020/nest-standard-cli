import { Injectable } from '@nestjs/common';

@Injectable()
export class SharedService {
  findAll() {
    return `This action returns all Shareds`;
  }
}
