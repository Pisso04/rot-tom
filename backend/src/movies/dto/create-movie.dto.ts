import { Genre } from "../../genres/entities/genre.entity"
export class CreateMovieDto {
  tmdb_id: String;
  release_date: Date;
  genres: Array<Genre>;
  director: String;
  title: String;
  overview: String;
  image: String;
  more: JSON;
}
