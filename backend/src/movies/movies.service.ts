import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Movie, MovieDocument } from 'src/schemas/movie.schema';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Model } from 'mongoose';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
  ) {}

  async create(createMovieDto: CreateMovieDto) {
    const createdMovie = new this.movieModel(createMovieDto);
    return createdMovie.save();
  }

  async findAll(): Promise<Movie[]> {
    return await this.movieModel
      .find()
      .populate('genres')
      .select('-__v')
      .exec();
  }

  async findOne(id: string) {
    return await this.movieModel.findById(id).select('-__v').exec();
  }

  async find(updateMovieDto: UpdateMovieDto) {
    return await this.movieModel.findOne(updateMovieDto).exec();
  }

  async update(id: string, updateMovieDto: UpdateMovieDto) {
    console.log(updateMovieDto);
    return await this.movieModel
      .findByIdAndUpdate(id, updateMovieDto, { new: true })
      .select('-__v');
  }

  async remove(id: string) {
    return await this.movieModel.findByIdAndRemove(id).select('-__v');
  }

  async getStats() {
    return await this.movieModel.countDocuments().exec();
  }

  async getStatsByGenre(genre_id: string) {
    return await this.movieModel.countDocuments({ genres: genre_id }).exec();
  }

  async getStatsByDate() {
    let TODAY = '2000-01-01T23:59:59';
    let YEAR_BEFORE = '1968-01-01T00:00:00';
    let req = { params: { productId: 1 } };
    const monthsArray = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return await this.movieModel
      .aggregate([
        {
          $match: {
            created_at: { $gte: YEAR_BEFORE, $lte: TODAY },
          },
        },
        {
          $group: {
            _id: { year_month: { $substrCP: ['$created_at', 0, 7] } },
            count: { $sum: 1 },
          },
        },
        {
          $sort: { '_id.year_month': 1 },
        },
        {
          $project: {
            _id: 0,
            count: 1,
            month_year: {
              $concat: [
                {
                  $arrayElemAt: [
                    monthsArray,
                    {
                      $subtract: [
                        { $toInt: { $substrCP: ['$_id.year_month', 5, 2] } },
                        1,
                      ],
                    },
                  ],
                },
                '-',
                { $substrCP: ['$_id.year_month', 0, 4] },
              ],
            },
          },
        },
        {
          $group: {
            _id: null,
            data: { $push: { k: '$month_year', v: '$count' } },
          },
        },
        {
          $project: {
            data: { $arrayToObject: '$data' },
            _id: 0,
          },
        },
      ])
      .exec();
  }

  async getOneStats(id: string) {
    return '';
  }
}
