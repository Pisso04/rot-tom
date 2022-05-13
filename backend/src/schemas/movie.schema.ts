import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';
import { Grade } from './grade.schema';
import { Genre } from './genre.schema';
export type MovieDocument = Movie & Document;


@Schema()
export class Movie {
  @Prop()
  tmdb_id: string;

  @Prop()
  release_date: Date;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }] })
  genres: Genre[];

  @Prop()
  director: string;

  @Prop()
  title: string;

  @Prop()
  overview: string;

  @Prop()
  image: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Grade' }] })
  grades: Grade[];

  @Prop({ type: JSON })
  more: JSON;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);

