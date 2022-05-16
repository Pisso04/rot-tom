import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Grade, GradeDocument } from 'src/schemas/grade.schema';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { FindGradeDto } from './dto/find-grade.dto';
import { Model } from 'mongoose';
@Injectable()
export class GradesService {
  constructor(
    @InjectModel(Grade.name) private gradeModel: Model<GradeDocument>,
  ) {}

  async create(createGradeDto: CreateGradeDto) {
    const createdGrade = new this.gradeModel(createGradeDto);
    return await createdGrade.save();
  }

  async findAll(): Promise<Grade[]> {
    return await this.gradeModel.find().exec();
  }

  async findOne(id: string) {
    return await this.gradeModel.findById(id).populate('movie').exec();
  }
  async find(findGradeDto: FindGradeDto) {
    return await this.gradeModel.findOne(findGradeDto).exec();
  }

  async update(id: string, updateGradeDto: UpdateGradeDto) {
    return await this.gradeModel
      .findByIdAndUpdate(id, updateGradeDto, {
        new: true,
      })
      .populate('movie');
  }

  async remove(id: string): Promise<Grade> {
    return await this.gradeModel.findByIdAndRemove(id).populate('movie').exec();
  }

  async getStatsByMovie(movie_id: string) {
    return await this.gradeModel.countDocuments({ movie: movie_id }).exec();
  }
}
