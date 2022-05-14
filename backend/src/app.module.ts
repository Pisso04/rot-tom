import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
import { CommentsModule } from './comments/comments.module';
import { ConfigModule } from '@nestjs/config';
import { GenresModule } from './genres/genres.module';
import { GradesModule } from './grades/grades.module';
import { DirectorsModule } from './directors/directors.module';
import { AuthModule } from './auth/auth.module';
import { StatistiqueModule } from './statistique/statistique.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/stream'),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    MoviesModule,
    CommentsModule,
    AuthModule,
    GenresModule,
    GradesModule,
    DirectorsModule,
    StatistiqueModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
