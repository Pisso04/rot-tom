import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { MoviesService } from 'src/movies/movies.service';
@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly moviesService: MoviesService,
  ) {}

  @Post()
  async create(@Body() createCommentDto: CreateCommentDto) {
    if (
      'movie' in createCommentDto &&
      'user' in createCommentDto &&
      'content' in createCommentDto &&
       createCommentDto.content != ""
    ) {
      return {
        data: await this.commentsService.create(createCommentDto),
        success: true,
      };
    } else return { success: false, error: 'All fields is required' };
  }

  @Get()
  async findAll() {
    return { data: await this.commentsService.findAll(), success: true };
  }

  @Get('movie/:movie_id')
  async findByMovie(@Param('movie_id') movie_id: string) {
    if (!movie_id.match(/^[0-9a-fA-F]{24}$/))
      return { error: 'Invalid id', success: false };
    const movie = await this.moviesService.findOne(movie_id);
    if (movie) return { data: await this.commentsService.findAllData({movie:movie_id}), success: true };
    return { error: 'Movie not found', success: false };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (!id.match(/^[0-9a-fA-F]{24}$/))
      return { error: 'Invalid id', success: false };
    const comment = await this.commentsService.findOne(id);
    if (comment) return { data: comment, success: true };
    return { error: 'Comment not found', success: false };
  }

  // @Patch(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body() updateCommentDto: UpdateCommentDto,
  // ) {
  //   if (!id.match(/^[0-9a-fA-F]{24}$/))
  //     return { error: 'Invalid id', success: false };
  //   const comment = await this.commentsService.update(id, updateCommentDto);
  //   if (comment) return { data: comment, success: true };
  //   return { error: 'Comment not found', success: false };
  // }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    if (!id.match(/^[0-9a-fA-F]{24}$/))
      return { error: 'Invalid id', success: false };
    const comment = await this.commentsService.remove(id);
    if (comment) return { data: comment, success: true };
    return { error: 'Comment not found', success: false };
  }
}
