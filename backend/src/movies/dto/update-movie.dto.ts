import { PartialType } from '@nestjs/mapped-types';
import { Genre } from '../../genres/entities/genre.entity';
import { Grade } from '../../grades/entities/grade.entity';

export class UpdateDataDto {
  tmdb_id: String;
  release_date: Date;
  genres: Array<Genre>;
  grade: Number;
  director: String;
  title: String;
  overview: String;
  image: String;
  more: JSON;
}

export class UpdateMovieDto extends PartialType(UpdateDataDto) {}
