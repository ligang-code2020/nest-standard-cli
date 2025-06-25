import { Module } from '@nestjs/common';
import { CatService } from './cat.service';
import { CatController } from './cat.controller';
import { SharedService } from '../shared/shared.service';

@Module({
  controllers: [CatController],
  providers: [CatService, SharedService],
  exports: [CatService],
})
export class CatModule {}
