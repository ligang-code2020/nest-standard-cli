import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  UserInterface,
  userList as users,
  COMMON_SALT,
} from '../../common/constants/user.constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User, 'mysql')
    private userModel: typeof User,
  ) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findOne(username: string): Promise<UserInterface | undefined> {
    console.log('findOne');
    return users.find((user) => user.username === username);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
