import { authContract } from '@shotly/contracts/auth';
import { Controller, Get, Req, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Request as ExpressRequest } from 'express';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @TsRestHandler(authContract.signIn)
  @UseGuards(LocalAuthGuard)
  signIn(@Req() req: ExpressRequest) {
    // TODO: signIn body is not validated because passport is executed first
    return tsRestHandler(authContract.signIn, () => {
      const response = this.authService.signIn(req.user);

      return Promise.resolve({
        status: 200,
        body: response,
      });
    });
  }

  @TsRestHandler(authContract.signUp)
  signUp() {
    return tsRestHandler(authContract.signUp, async ({ body }) => {
      const response = await this.authService.signUp(body);

      return {
        status: 200,
        body: response,
      };
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: ExpressRequest) {
    return req.user;
  }
}
