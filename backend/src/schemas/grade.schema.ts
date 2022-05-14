import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';
import { Movie } from './movie.schema';
import { User } from './user.schema';
export type GradeDocument = Grade & Document;

@Schema()
export class Grade {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true })
  movie: Movie;

  @Prop()
  note: number;

  @Prop({
    type: Date,
    default: new Date(),
  })
  date: Date;
}

export const GradeSchema = SchemaFactory.createForClass(Grade);
