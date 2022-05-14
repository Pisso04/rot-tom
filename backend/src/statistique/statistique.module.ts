import { Module } from '@nestjs/common';
import { StatistiqueService } from './statistique.service';
import { StatistiqueController } from './statistique.controller';
import { UsersModule } from 'src/users/users.module';
import { MoviesModule } from 'src/movies/movies.module';
import { GenresModule } from 'src/genres/genres.module';

@Module({
  imports: [UsersModule, MoviesModule, GenresModule],
  controllers: [StatistiqueController],
  providers: [StatistiqueService],
})
export class StatistiqueModule {}
