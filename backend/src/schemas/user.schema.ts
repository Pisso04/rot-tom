import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';
import { Movie } from './movie.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    type: String,
    minlength: [3, 'Username is Incorrect'],
    unique: [true, 'User already exist'],
    required: [true, 'Username is required'],
  })
  username: string;

  @Prop({
    type: String,
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Email Incorrect',
    ],
    unique: [true, 'Email already exist'],
    required: [true, 'Email is required'],
  })
  email: string;

  @Prop({
    type: String,
    minlength: 8,
    required: [true, 'Password is required'],
  })
  password: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  is_admin: boolean;

  @Prop({
    type: Boolean,
    default: false,
  })
  has_admin_privilege: boolean;

  @Prop({
    type: Date,
    default: new Date(),
  })
  created_at: Date;

  @Prop({
    type: Date,
    default: new Date(),
  })
  updated_at: Date;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }] })
  favorites: Movie[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }] })
  watchlist: Movie[];
}

export const UserSchema = SchemaFactory.createForClass(User);
