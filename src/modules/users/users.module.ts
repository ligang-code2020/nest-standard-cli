import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CatModule } from 'src/modules/cat/cat.module';
import { AuthService } from '../auth/auth.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, AuthService],
  imports: [SequelizeModule.forFeature([User], 'mysql'), CatModule],
  exports: [UsersService],
})
export class UsersModule {}
