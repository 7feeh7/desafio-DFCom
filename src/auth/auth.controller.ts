import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { TokensService } from 'src/tokens/tokens.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokensService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req: any) {
    const { access_token } = await this.authService.login(req.user);

    const refreshToken = await this.tokenService.create(req.user.id);

    return { accessToken: access_token, user: req.user, refreshToken };
  }

  @Post('refresh-token')
  async refreshToken(@Req() req, @Res() res) {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).send();
    }

    const { access_token, user } =
      await this.authService.refreshToken(refreshToken);

    const newRefreshToken = await this.tokenService.create(user._id);

    return res
      .status(200)
      .json({ accessToken: access_token, user, refreshToken: newRefreshToken });
  }
}
