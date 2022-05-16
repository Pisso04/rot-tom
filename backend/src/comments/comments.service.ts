import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentDocument } from 'src/schemas/comment.schema';
@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    const createdGenre = new this.commentModel(createCommentDto);
    return await createdGenre.save();
  }

  async findAll(): Promise<Comment[]> {
    return await this.commentModel.find().exec();
  }

  async findAllData(updateCommentDto: UpdateCommentDto) {
    return await this.commentModel.find(updateCommentDto).populate('user').exec();
  }

  async find(updateCommentDto: UpdateCommentDto) {
    return await this.commentModel.findOne(updateCommentDto).exec();
  }

  async findOne(id: string) {
    return await this.commentModel.findById(id).exec();
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    return await this.commentModel.findByIdAndUpdate(id, updateCommentDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return await this.commentModel.findByIdAndRemove(id).exec();
  }

  async getStats() {
    return await this.commentModel.countDocuments().exec();
  }
}
