import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentDocument } from 'src/schemas/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from 'src/schemas/comment.schema';

@Injectable()

export class CommentsService {

  constructor(@InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ){}

  async create(createCommentDto: CreateCommentDto) {
    const createcomment = new this.commentModel(createCommentDto);
     createcomment.save();
     return createcomment;
  }

  async findAll() {
    return this.commentModel.find();
  }

  async findOne(name: string) {
    return this.commentModel.findOne({name});
  }

  async update(name: string, updateCommentDto: UpdateCommentDto) {
    return this.commentModel.updateOne({name}, {$set: {...UpdateCommentDto}});
  }

  async remove(name: string) {
    return this.commentModel.deleteOne({ name });
  }
}
