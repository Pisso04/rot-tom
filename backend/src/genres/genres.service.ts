import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Genre, GenreDocument } from 'src/schemas/genre.schema';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Model } from 'mongoose';


@Injectable()
export class GenresService {
  constructor(
    @InjectModel(Genre.name) private genreModel: Model<GenreDocument>,
  ) {}

  async create(createGenreDto: CreateGenreDto) {
    const createdGenre = new this.genreModel(createGenreDto);
    return await createdGenre.save();
  }

  async findAll(): Promise<Genre[]> {
    return await this.genreModel.find().exec();
  }

  async find(updateGenreDto: UpdateGenreDto) {
    return await this.genreModel.findOne(updateGenreDto).exec();
  }

  async findOne(id: number) {
    return await this.genreModel.findById(id).exec();
  }

  async update(id: number, updateGenreDto: UpdateGenreDto) {
    return await this.genreModel.findByIdAndUpdate(id, updateGenreDto, {
      new: true,
    });
  }

  async remove(id: number) {
    return await this.genreModel.findByIdAndRemove(id).exec();
  }
}
