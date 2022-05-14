import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DirectorDocument = Director & Document;

@Schema()
export class Director {
  @Prop({
    required: [true, 'Director tmdb_id is required'],
    unique: [true, 'Director already exist'],
  })
  tmdb_id: Number;
  @Prop({
    required: [true, 'Director name is required'],
    unique: [true, 'Director already exist'],
  })
  name: string;
}

export const DirectorSchema = SchemaFactory.createForClass(Director);
