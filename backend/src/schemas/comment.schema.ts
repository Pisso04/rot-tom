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

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true })
  movie: Movie;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({type:Date, default: new Date()})
  date: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
