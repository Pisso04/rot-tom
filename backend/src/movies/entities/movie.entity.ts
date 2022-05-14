import { Genre } from "../../genres/entities/genre.entity"
import { Grade } from '../../grades/entities/grade.entity';
import { Director } from '../../directors/entities/director.entity';

export class Movie {
  tmdb_id: string;
  release_date: Date;
  genres: Array<Genre>;
  director: Director;
  grade:number;
  title: string;
  overview: string;
  image: string;
  more: JSON;
}

