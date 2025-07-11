import { authContract } from '@shotly/contracts/auth';
import { Controller, Request, Res, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Request as ExpressRequest, Response } from 'express';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @TsRestHandler(authContract.signIn)
  signIn(
    @Request() req: ExpressRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    // TODO: signIn body is not validated because passport is executed first
    return tsRestHandler(authContract.signIn, () => {
      const { accessToken } = this.authService.signIn(req.user);
      res.cookie('jwt', accessToken, { httpOnly: true, secure: true });

      return Promise.resolve({
        status: 200,
        body: {},
      });
    });
  }

  @TsRestHandler(authContract.signUp)
  signUp(@Res({ passthrough: true }) res: Response) {
    return tsRestHandler(authContract.signUp, async ({ body }) => {
      const { accessToken } = await this.authService.signUp(body);
      res.cookie('jwt', accessToken, { httpOnly: true, secure: true });

      return {
        status: 200,
        body: {},
      };
    });
  }

  @UseGuards(JwtAuthGuard)
  @TsRestHandler(authContract.getProfile)
  getProfile(@Request() req: ExpressRequest) {
    return tsRestHandler(authContract.getProfile, async () => {
      const response = await this.authService.getProfile(req.user?.id ?? '');

      return {
        status: 200,
        body: response,
      };
    });
  }
}
