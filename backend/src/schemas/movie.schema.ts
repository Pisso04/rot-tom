import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';
import { Genre } from './genre.schema';
import { Director } from './director.schema';

export type MovieDocument = Movie & Document;


@Schema()
export class Movie {
  @Prop()
  tmdb_id: string;

  @Prop()
  release_date: Date;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }] })
  genres: Genre[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Director',
    required: true,
  })
  director: Director;

  @Prop()
  title: string;

  @Prop()
  overview: string;

  @Prop()
  image: string;

  @Prop({
    default: 0,
  })
  grade: number;

  @Prop({ type: JSON })
  more: JSON;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);

