import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { comparePasswords } from 'src/helpers/bcrypt.helper';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: any) {
    const payload = { sub: user.id, email: user.email };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string) {
    let user;
    try {
      user = await this.userService.findOneOrFail({ email });
    } catch (error) {
      return null;
    }

    const isPasswordValid = comparePasswords(password, user.password);

    if (!isPasswordValid) return null;

    return user;
  }
}
