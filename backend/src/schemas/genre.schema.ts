import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GenreDocument = Genre & Document;

@Schema()
export class Genre {
  @Prop({
    required: [true, 'Genre tmdb_id is required'],
    unique: [true, 'Genre already exist'],
  })
  tmdb_id: Number;
  @Prop({
    required: [true, 'Genre name is required'],
    unique: [true, 'Genre already exist'],
  })
  name: string;
}

export const GenreSchema = SchemaFactory.createForClass(Genre);
