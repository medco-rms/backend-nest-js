import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import * as nestjsBetterAuth from '@thallesp/nestjs-better-auth';
import { AuthService } from './bases/auth.service';
import type { Response } from 'express';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';

@Controller('/api')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get('hello')
  @AllowAnonymous()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('me')
  getMe(@nestjsBetterAuth.Session() session: nestjsBetterAuth.UserSession) {
    return {
      user: session.user,
    };
  }

  @Post('signup')
  @AllowAnonymous()
  async signup(
    @Body()
    data: {
      email: string;
      password: string;
      name: string;
    },
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.auth_signup({
      data,
      res,
      after_func: async ({ better_auth_id, tx }) => {
        // additional database operations here
      },
      includePasswordInEmailTemplate: false,
    });
  }
}
