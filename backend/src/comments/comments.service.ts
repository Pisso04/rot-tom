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

  async findOne(id: string) {
    return this.commentModel.findOne({_id :id});
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    return this.commentModel.updateOne({_id : id}, { $set: updateCommentDto });

    // const { comment } = await this.findCommentById(id);
    // if (updateCommentDto.title) {
    //     comment.title = updateCommentDto.title;
    // }
    // if (updateCommentDto.body) {
    //     comment.body = updateCommentDto.body;
    // }
    // await comment.save();
    // return { comment };

  }

  async remove(id: string) {
    return this.commentModel.deleteOne({ _id : id });
  }
}
