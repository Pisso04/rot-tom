import { Injectable } from '@nestjs/common';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Director, DirectorDocument } from 'src/schemas/director.schema';
import { Model } from 'mongoose';
@Injectable()
export class DirectorsService {
  constructor(
    @InjectModel(Director.name) private directorModel: Model<DirectorDocument>,
  ) {}

  async create(createDirectorDto: CreateDirectorDto) {
    const createdGenre = new this.directorModel(createDirectorDto);
    return await createdGenre.save();
  }

  async findAll(): Promise<Director[]> {
    return await this.directorModel.find().exec();
  }

  async find(updateDirectorDto: UpdateDirectorDto) {
    return await this.directorModel.findOne(updateDirectorDto).exec();
  }

  async findOne(id: string) {
    return await this.directorModel.findById(id).exec();
  }

  async update(id: string, updateDirectorDto: UpdateDirectorDto) {
    return await this.directorModel.findByIdAndUpdate(id, updateDirectorDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return await this.directorModel.findByIdAndRemove(id).exec();
  }
}
