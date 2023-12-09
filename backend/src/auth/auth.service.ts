import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { comparePasswords } from 'src/helpers/bcrypt.helper';
import { JwtService } from '@nestjs/jwt';
import { TokensService } from 'src/tokens/tokens.service';
import { isExpired } from 'src/helpers/expires.helper';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly tokenService: TokensService,
  ) {}

  async refreshToken(token: any) {
    const refreshToken = await this.tokenService.findOne(token._id);

    if (!refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    if (isExpired(refreshToken.expiresAt)) {
      throw new UnauthorizedException('Refresh token expired');
    }

    console.log('refreshToken', refreshToken);

    const user = await this.userService.findOne(refreshToken.userId);

    console.log('user', user);

    const payload = {
      email: user.email,
    };

    console.log('payload', payload);

    console.log('teste', this.jwtService.sign(payload));

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
    // access_token: this.jwtService.sign(payload),
  }

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
