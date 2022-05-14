import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { Movie } from 'src/movies/entities/movie.entity'
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string) {
    return await this.userModel.findById(id).select('-__v').exec();
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }

  async getStats() {
    return await this.userModel.countDocuments().exec();
  }

  // async addFavorite(id: string, movie: Movie) {
  //   const user = this.findOne(id);
  //   if (user) {
  //     var index = user.favorites.indexOf(movie._id);
  //     if (index !== -1) {
  //       user.favorites.splice(index, 1);
  //     } else {
  //       user.favorites.push(movie);
  //     }
  //     await user.save();

  //     return user;
  //   }
  // }
}
