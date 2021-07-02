import { Controller, Post, Body, Header } from '@nestjs/common';
import { AuthService, authResponse } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  login(@Body('id') id: string): authResponse {
    return this.authService.login(id);
  }
  @Post('register')
  async register(
    @Body('email') email: string,
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    const result = await this.authService.register(email, username, password);
    return result;
  }
}
