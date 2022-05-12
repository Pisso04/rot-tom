import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  deleteUser(arg0: number) {
    throw new Error('Method not implemented.');
  }
  updateUser(userId: string, name: string, number: number, surname: string, email: string) {
    throw new Error('Method not implemented.');
  }
  inserUsert(name: string, age: any, surname: string, email: string) {
    throw new Error('Method not implemented.');
  }
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
