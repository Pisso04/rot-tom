import { Controller, Get } from '@nestjs/common';
import { MoviesService } from 'src/movies/movies.service';
import { UsersService } from 'src/users/users.service';
import { GenresService } from 'src/genres/genres.service';
import { CommentsService } from 'src/comments/comments.service';

@Controller('statistique')
export class StatistiqueController {
  constructor(
    private readonly moviesService: MoviesService,
    private readonly genresService: GenresService,
    private readonly commentsService: CommentsService,
    private readonly usersService: UsersService, // private readonly usersService: UsersService,
  ) {}

  @Get()
  async stats() {
    const genres = await this.genresService.findAll();
    const movies_by_genres = [];
    for (var i = 0; i < genres.length; i++) {
      var genre = await this.genresService.find({ tmdb_id: genres[i].tmdb_id });
      movies_by_genres.push({
        name: genres[i].name,
        total: await this.moviesService.getStatsByGenre(genre._id),
      });
    }

    const data = {
      nbre_movies: await this.moviesService.getStats(),
      nbre_users: await this.usersService.getStats(),
      nbre_genres: await this.genresService.getStats(),
      nbre_comments: await this.commentsService.getStats(),
      movies_by_genres: movies_by_genres,
    };

    return { success: true, data: data };
  }
}
