import { Module } from '@nestjs/common';
import { StatistiqueService } from './statistique.service';
import { StatistiqueController } from './statistique.controller';
import { UsersModule } from 'src/users/users.module';
import { MoviesModule } from 'src/movies/movies.module';
import { GenresModule } from 'src/genres/genres.module';
import { CommentsModule } from 'src/comments/comments.module';

@Module({
  imports: [UsersModule, MoviesModule, GenresModule, CommentsModule],
  controllers: [StatistiqueController],
  providers: [StatistiqueService],
})
export class StatistiqueModule {}
