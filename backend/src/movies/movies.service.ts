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
    return await this.movieModel.findById(id).populate('genres').select('-__v').exec();
    return await this.movieModel
      .findById(id)
      .populate('director')
      .populate('genres')
      .exec();
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
  
  async getGenreMovies(genre_id: string) {
    const movies = [];
    const allMovies = await this.findAll();
    allMovies.forEach((movie) => {
      movie.genres.forEach((genre) => {
        if (genre.tmdb_id.toString() == genre_id) {
          movies.push(movie);
        }
      });
    });
    return movies;
  }

  async getDirectorMovies(director_id: string){
    const movies = [];
    const allMovies = await this.findAll();
    allMovies.forEach((movie) => {
      if(movie.director.toString() == director_id){
        movies.push(movie)
      };
    })
    return movies;
  }
}
