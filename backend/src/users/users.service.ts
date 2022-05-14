import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
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

  // async addFavorite(user: User, movie: Movie) {
   
  //   var index = user.favorites.indexOf(movie._id);
  //   if (index !== -1) {
  //     user.favorites.splice(index, 1);
  //   } else {
  //     user.favorites.push(movie);
  //   }
  //   await user.save();

  //   return user;
  // }
}
