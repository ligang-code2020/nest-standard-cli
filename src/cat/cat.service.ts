import { Injectable } from '@nestjs/common';
import { SharedService } from '../shared/shared.service';

@Injectable()
export class CatService {
  constructor(private shared: SharedService) {}

  findAll() {
    return this.shared.findAll();
    // return `This action returns all cats`;
  }
}
