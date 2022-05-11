import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

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
}
