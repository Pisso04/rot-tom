import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';
import { Movie } from './movie.schema';
import { User } from './user.schema';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop()
  content: string;

  @Prop()
  name: string;

  @Prop()
  comment: string;

  @Prop()
  age: number;

  @Prop()
  id: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: false })
  movie: Movie;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false })
  user: User;

  @Prop()
  date: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
