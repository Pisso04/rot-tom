import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';
import { Grade } from './grade.schema';

export type CatDocument = Movie & Document;


@Schema()
export class Movie {
  @Prop()
  tmdb_id: string;

  @Prop()
  release_date: Date;

  @Prop()
  genres: string;

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
  
  @Prop()
  more: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
