import {
  Controller,
  Inject,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CatService } from '../cat/cat.service';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { LoginDto } from './dto/login.dto';
import { AuthService } from '../auth/auth.service';
import { LoggingInterceptor } from '../../common/interceptors/logging.interceptors';
import { TimeoutInterceptor } from 'src/common/interceptors/timeout.interceptor';

@UseInterceptors(LoggingInterceptor)
@Controller('users')
export class UsersController {
  // 基于属性的注入的 cat
  @Inject()
  private catsService: CatService;

  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @SkipAuth()
  @UseInterceptors(TimeoutInterceptor)
  findAll() {
    return this.catsService.findAll();
    // return this.usersService.findAll();
  }

  @Get('findOne')
  @SkipAuth()
  findOne(@Query('username') username: string) {
    return this.usersService.findOne(username);
  }

  @SkipAuth()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.validateUser(loginDto.username, loginDto.password);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
