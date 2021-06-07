import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../components/users/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.oneUser(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(authData: {
    email: string;
    pass: string;
  }): Promise<{ access_token: string }> {
    const userInfo = await this.validateUser(authData.email, authData.pass);
    if (userInfo) {
      const payload = { email: userInfo.email, sub: userInfo.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } else {
      throw new HttpException(
        '유저 정보 또는 패스워가 잘못 입력되었습니다.',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
