import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.getUserByEmail(email);
    if (user !== null && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      console.log(user);
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      username: user._doc.username,
      id: user._doc._id.toString(),
      email: user._doc.email,
      admin: user._doc.is_admin,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
