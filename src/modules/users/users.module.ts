import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CatModule } from 'src/modules/cat/cat.module';
import { AuthService } from '../auth/auth.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, AuthService],
  imports: [CatModule],
  exports: [UsersService],
})
export class UsersModule {}
