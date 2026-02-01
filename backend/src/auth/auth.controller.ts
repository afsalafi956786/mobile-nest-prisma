import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dts';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { RequestWithCookies } from 'src/common/service/auth-helper';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('create-admin')
  @ApiOperation({ summary: 'Create admin' })
  @ApiBody({ type: CreateAuthDto })
  async createAdmin(
    @Body() createAuthDto: CreateAuthDto,
  ): Promise<{ success: boolean; message: string; statusCode: number }> {
    return this.authService.createAdmin(createAuthDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login User' })
  @ApiBody({ type: LoginAuthDto })
  async login(
    @Body() loginAuthDto: LoginAuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.userLogin(loginAuthDto);

    const payload = {
      userId: result.user.id,
      email: result.user.email,
    };

    const token = await this.jwtService.signAsync(payload);

    // STORE COOKIE HERE
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return result;
  }

  @Get('me')
  async getMe(@Req() req: RequestWithCookies) {
    try {
      const token = req.cookies['token']; // read cookie
      if (!token) throw new UnauthorizedException();

      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      return { userId: payload.userId, email: payload.email };
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'lax', // match your login cookie
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });
    return { statusCode: HttpStatus.OK, message: 'Logged out successfully' };
  }
}
