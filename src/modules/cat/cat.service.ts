import { Injectable } from '@nestjs/common';
import { SharedService } from '../../shared/shared.service';
import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class CatService {
  constructor(private shared: SharedService) {}

  findAll() {
    return this.shared.findAll();
    // return `This action returns all cats`;
  }

  create(createCatDto: CreateCatDto) {
    return createCatDto;
  }
}
