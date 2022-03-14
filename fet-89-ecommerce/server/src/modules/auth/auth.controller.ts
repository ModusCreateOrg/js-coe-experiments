import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUser } from '../users/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req?.user);
  }

  @Post('register')
  async register(@Body() user: CreateUser) {
    return this.authService.register(user);
  }
}
