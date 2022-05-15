import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GradesService } from './grades.service';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { MoviesService } from 'src/movies/movies.service'
import { UsersService } from 'src/users/users.service';

@Controller('grades')
export class GradesController {
  constructor(
    private readonly gradesService: GradesService,
    private readonly moviesService: MoviesService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  async create(@Body() createGradeDto: CreateGradeDto) {
    if (
      'user' in createGradeDto &&
      'movie' in createGradeDto &&
      'note' in createGradeDto
    ) {
      const verif = await this.verify(createGradeDto);
      if (verif.success){
        const grade = await this.gradesService.create(createGradeDto);
        this.moviesService.update(createGradeDto.movie, {
          grade: (verif.movie.grade + grade.note ) /2
        });
        return {
          data: grade,
          success: true,
        };
      }
      else return { success: false, error: verif.error };
    } else return { success: false, error: 'All fields are required' };
  }

  async verify(createGradeDto: CreateGradeDto): Promise<any> {
    try {
      if (createGradeDto.note < 0 || createGradeDto.note > 10)
        return { success: false, error: 'Note must be between 0 and 10' };

      if (
        !createGradeDto.user.match(/^[0-9a-fA-F]{24}$/) ||
        !createGradeDto.movie.match(/^[0-9a-fA-F]{24}$/)
      )
        return { error: 'Invalid id', success: false };

      const exist = await this.gradesService.find({
        movie: createGradeDto.movie,
        user: createGradeDto.user,
      });
      if (exist) return { success: false, error: 'Grade already exist' };
      const movie = await this.moviesService.findOne(createGradeDto.movie);
      if (!movie)
        return { success: false, error: 'The movie is not found' };

      if (!(await this.usersService.findOne(createGradeDto.user)))
        return { success: false, error: 'The user is not found' };

      return { success: true , movie:movie};
    } catch {
      return { success: false, error: 'All fields is required' };
    }
  }

  @Get()
  async findAll() {
    return { data: await this.gradesService.findAll(), success: true };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (!id.match(/^[0-9a-fA-F]{24}$/))
      return { error: 'Invalid id', success: false };
    const grade =  await this.gradesService.findOne(id);
    if (grade) return { data: grade, success: true };
    return { error: 'Movie grade not found', success: false };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateGradeDto: UpdateGradeDto) {
    if (!id.match(/^[0-9a-fA-F]{24}$/))
      return { error: 'Invalid id', success: false };
    if('note' in updateGradeDto ){
      if (updateGradeDto.note >= 0 || updateGradeDto.note <= 10){
        const old_grade = await this.gradesService.findOne(id);
        if (old_grade) {
          if (old_grade.note != updateGradeDto.note) {
            const movie = await this.moviesService.find({
              tmdb_id: old_grade.movie.tmdb_id,
            });
            const new_grade_value =
              (2 * movie.grade - old_grade.note + updateGradeDto.note) / 2;
            this.moviesService.update(movie._id, { grade: new_grade_value });
            return { data: await this.gradesService.update(id, updateGradeDto), success: true };
          }
          return { data: old_grade, success: true };
        }
        return { error: 'Movie grade not found', success: false };
      }
      else{
        return { error: 'Note must be between 0 and 10', success: false };
      }
    }
    else{
      return { error: 'Required field not found', success: false };
    }
  }

  // @Delete(':id')
  // async remove(@Param('id') id: string) {
  //   if (!id.match(/^[0-9a-fA-F]{24}$/))
  //     return { error: 'Invalid id', success: false };
  //   const grade = await this.gradesService.remove(id);
  //   if (grade) {
  //     return { data: grade, success: true };
  //   };
  //   return { error: 'Movie grade not found', success: false };
  // }
}
