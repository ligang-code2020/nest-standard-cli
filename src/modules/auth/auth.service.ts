import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { encryptPassword } from '../../utils/cryptogram.util';
import { COMMON_SALT } from '../../common/constants/user.constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const user = await this.usersService.findOne(username);
    if (user) {
      const hashedPassword = user.passwordHash;
      const salt = COMMON_SALT;
      // 通过密码盐，加密传参，再与数据库里的比较，判断是否相等
      const hashPassword = encryptPassword(password, salt);
      if (hashedPassword === hashPassword) {
        const payload = { username: user.username };
        const token = await this.jwtService.signAsync(payload, {
          expiresIn: '30s',
        });
        const refresh_token = await this.jwtService.signAsync(payload);
        return { access_token: token, refresh_token };
      } else {
        throw new NotFoundException('密码错误');
      }
    } else {
      throw new NotFoundException('登录失败 [没有这个用户]');
    }
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
