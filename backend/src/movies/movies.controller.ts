import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { CreateMovieInputDto } from './dto/create-movie-input.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { GenresService } from 'src/genres/genres.service';
import { DirectorsService } from 'src/directors/directors.service';
import { ConfigService } from '@nestjs/config';
import fetch from 'cross-fetch';
@Controller('movies')
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
    private readonly configService: ConfigService,
    private readonly genresService: GenresService,
    private readonly directorsService: DirectorsService,
    // private readonly usersService: UsersService,
  ) {}

  @Post()
  async create(@Body() createMovieInputDto: CreateMovieInputDto) {
    const url =
      this.configService.get('API_BASE_URL') +
      'movie/' +
      createMovieInputDto.tmdb_id +
      '?api_key=' +
      this.configService.get('API_KEY') +
      '&language=en-US';
    const res = await this.getDataFromApi(url);

    if (res.success) {
      const movie_exist = await this.moviesService.find({
        tmdb_id: res.data.id,
      });
      console.log(movie_exist)
      if (!movie_exist) {
        const genres = [];
        for (var i = 0; i < res.data.genres.length; i++) {
          const genre = res.data.genres[i];
          const exist = await this.genresService.find({
            tmdb_id: genre.id,
            name: genre.name,
          });
          if (exist) {
            genres.push(exist);
          } else {
            genres.push(
              await this.genresService.create({
                tmdb_id: genre.id,
                name: genre.name,
              }),
            );
          }
        }
        var director;
        const director_exist = await this.directorsService.find({
          tmdb_id: res.data.production_companies[0].id,
          name: res.data.production_companies[0].name,
        });
        if (director_exist) {
          director = director_exist;
        } else {
          director = await this.directorsService.create({
            tmdb_id: res.data.production_companies[0].id,
            name: res.data.production_companies[0].name,
          });
        }
        const createMovieDto = new CreateMovieDto();
        createMovieDto.tmdb_id = createMovieInputDto.tmdb_id;
        createMovieDto.release_date = res.data.release_date;
        createMovieDto.genres = genres;
        createMovieDto.director = director;
        createMovieDto.title = res.data.title;
        createMovieDto.overview = res.data.overview;
        createMovieDto.image = res.data.poster_path;
        return {
          success: true,
          data: await this.moviesService.create(createMovieDto),
        };
      } else {
        return { error: 'Movie already added', success: false };
      }
    }
    return res.error;
  }

  async getDataFromApi(url: string): Promise<any> {
    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if ('success' in data && !data.success)
          return { success: false, error: data };
        return { data: data, success: true };
      })
      .catch((err) => {
        return { success: false, error: err };
      });
  }

  @Get()
  async findAll() {
    return { success: true, data: await this.moviesService.findAll() };
  }

  @Get('genre/:genre_id')
  async findGenreMovies(@Param('genre_id') genre_id: string){
    return this.moviesService.getGenreMovies(genre_id)
  }

  @Get('director/:director_id')
  async findDirectorMovies(@Param('director_id') director_id: string){
    return this.moviesService.getDirectorMovies(director_id)
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (!id.match(/^[0-9a-fA-F]{24}$/))
      return { error: 'Invalid id', success: false };
    const movie = await this.moviesService.findOne(id);
    if (movie) return { data: movie, success: true };
    return { error: 'Movie not found', success: false };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    if (!id.match(/^[0-9a-fA-F]{24}$/))
      return { error: 'Invalid id', success: false };
    return {
      success: true,
      data: await this.moviesService.update(id, updateMovieDto),
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    if (!id.match(/^[0-9a-fA-F]{24}$/))
      return { error: 'Invalid id', success: false };
    const movie = await this.moviesService.remove(id);
    if (movie) return { success: true, data: movie };
    return { error: 'Movie not found', success: false };
  }
}
