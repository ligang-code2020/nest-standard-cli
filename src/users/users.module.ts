import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CatModule } from 'src/cat/cat.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [CatModule],
})
export class UsersModule {}
