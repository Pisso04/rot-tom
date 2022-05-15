import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import * as bcrypt from 'bcrypt';
import { ChangeUserPassword } from './dto/change-user-password';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import { MoviesService } from '../movies/movies.service';
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly moviesService: MoviesService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    const error = [];
    if (createUserDto.username.length < 3)
      error.push('Username are required and must be at least 3 characters');
    const test = await this.usersService.checkIfExist({
      username: createUserDto.username,
    });
    if (test != 0) error.push('Username already taken');
    const regexpName = new RegExp(/^[a-z0-9]+$/i);
    if (!regexpName.test(createUserDto.username))
      error.push('Username must not contain special chars');
    const regexp = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
    if (!regexp.test(createUserDto.email)) error.push('Invalid email address');
    const test2 = await this.usersService.checkIfExist({
      email: createUserDto.email,
    });
    const regexp2 = new RegExp(
      /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/,
    );
    if (test2 != 0) error.push('Email already taken');
    if (createUserDto.password.length < 8)
      error.push('Password must be at least 8 charcacters');
    else if (!regexp2.test(createUserDto.password))
      error.push(
        'Invalid password your password must contain at least 1 number, uppercase letter and special chars',
      );
    if (error.length != 0) return { errors: error };
    return await this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post('admin/:id')
  async setAdmin(@Param('id') id: string) {
    return this.usersService.setadmin(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('password/:id')
  async changePassword(
    @Param('id') id: string,
    @Body() changeUserPassword: ChangeUserPassword,
  ) {
    const error = [];
    if (changeUserPassword.password != changeUserPassword.confirmPassword)
      error.push("Passwords don't match");
    if (
      changeUserPassword.password.length < 8 ||
      changeUserPassword.confirmPassword.length < 8
    )
      error.push('Invalid Password');
    const regexp2 = new RegExp(
      /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/,
    );
    if (
      !regexp2.test(changeUserPassword.password) &&
      !regexp2.test(changeUserPassword.confirmPassword)
    )
      error.push(
        'Password must contain at least 1 number, uppercase letter, lowercase and special chars',
      );
    if (error.length != 0) return JSON.stringify({ errors: error });
    return await this.usersService.updatePassword(id, {
      password: changeUserPassword.password,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const error = [];
    if (updateUserDto.username.length < 3)
      error.push('Username are required and must be at least 3 characters');
    const test = await this.usersService.checkIfExistWithout(
      {
        username: updateUserDto.username,
      },
      id,
    );
    if (test != 0) error.push('Username already taken');
    const regexpName = new RegExp(/^[a-z0-9]+$/i);
    if (!regexpName.test(updateUserDto.username))
      error.push('Username must not contain special chars');
    const regexp = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
    if (!regexp.test(updateUserDto.email)) error.push('Invalid email address');
    const test2 = await this.usersService.checkIfExistWithout(
      {
        email: updateUserDto.email,
      },
      id,
    );
    if (test2 != 0) error.push('Email already taken');
    if (updateUserDto.password.length < 8) error.push('Invalid Password');
    const regexp2 = new RegExp(
      /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/,
    );
    if (!regexp2.test(updateUserDto.password))
      error.push(
        'Invalid password your password must contain at least 1 number, uppercase letter, lowercase and special chars',
      );
    else {
      const test3 = await this.usersService.findOne(id);
      if (!(await bcrypt.compare(updateUserDto.password, test3.password)))
        error.push('Incorrect Password !! Re-try');
    }
    if (error.length != 0) return JSON.stringify({ errors: error });
    return await this.usersService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Body() ref) {
    console.log({ id, ref });
    if (ref.id !== id) return this.usersService.remove(id);
  }
  @Post('add_favorite')
  async addFavorite(@Body() createFavoriteDto: CreateFavoriteDto) {
    if ('movie_id' in createFavoriteDto && 'user_id' in createFavoriteDto) {
      return await this.usersService.addFavorite(
        createFavoriteDto.user_id,
        createFavoriteDto.movie_id,
      );
    }
    return { error: 'All fields is required', success: false };
  }
}
