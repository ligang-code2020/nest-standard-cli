import { Module } from '@nestjs/common';
import { SharedService } from './shared.service';
import { SharedController } from './shared.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [SharedController],
  providers: [SharedService],
  imports: [ConfigModule],
})
export class SharedModule {}
