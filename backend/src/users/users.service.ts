import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { Movie } from 'src/schemas/movie.schema';
import { MoviesService } from '../movies/movies.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly moviesService: MoviesService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await new this.userModel({
      username: createUserDto.username,
      email: createUserDto.email,
      password: await bcrypt.hash(createUserDto.password, 10),
      created_at: new Date(),
      updated_at: new Date(),
    }).save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  findOne(id: string) {
    return this.userModel.findById(id);
  }

  async checkIfExist(query: any) {
    return await this.userModel.find(query).count();
  }

  async checkIfExistWithout(query: any, value: string) {
    return await this.userModel
      .find(query)
      .where('_id')
      .ne(value)
      .count()
      .exec();
  }

  async updatePassword(id: string, query: any): Promise<User> {
    await this.userModel
      .findByIdAndUpdate(id, {
        password: await bcrypt.hash(query.password, 10),
        updated_at: new Date(),
      })
      .exec();
    return this.userModel.findOne({ _id: id });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userModel
      .findByIdAndUpdate(id, {
        username: updateUserDto.username,
        email: updateUserDto.email,
        updated_at: new Date(),
      })
      .exec();
    return this.userModel.findOne({ _id: id });
  }

  async updatePref(id: string, updatePref): Promise<User> {
    await this.userModel
      .findByIdAndUpdate(id, {
        pref: updatePref,
      })
      .exec();
    return this.userModel.findOne({ _id: id });
  }

  async remove(id: string) {
    return await this.userModel.findByIdAndDelete(id).exec();
  }

  async getUser(query: JSON) {
    const user = await this.userModel.findOne(query);
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async getStats() {
    return await this.userModel.countDocuments().exec();
  }

  async addFavorite(id: string, movie_id: string) {
    const user = await this.userModel.findById(id);
    const movie = await this.moviesService.findOne(movie_id);
    if (user) {
      if (movie) {
        var index = user.favorites.indexOf(movie._id);
        console.log(index);
        console.log(movie.id);
        console.log(user.favorites);
        if (index !== -1) {
          user.favorites.splice(index, 1);
        } else {
          user.favorites.push(movie);
        }
        await user.save();
        return { data: user, success: true };
      }
      return { error: 'Movie not found', success: false };
    }
    return { error: 'User not found', success: false };
  }
}
