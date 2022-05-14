import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GenresService } from './genres.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Post()
  async create(@Body() createGenreDto: CreateGenreDto) {
    if('tmdb_id' in createGenreDto && 'name' in createGenreDto){
      return {data: await this.genresService.create(createGenreDto), success:true};
    }
    else  return {success:false, error:"All fields are required"}
  }

  @Get()
  async findAll() {
    return {data: await this.genresService.findAll(), success:true};
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) return { error: 'Invalid id',success: false};
    const genre =   await this.genresService.findOne(id);
    if (genre) return {data:genre, success:true};
    return { error: 'Movie genre not found', success:false};
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateGenreDto: UpdateGenreDto) {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) return { error: 'Invalid id', success: false};
    const genre = await this.genresService.update(id, updateGenreDto);
    if (genre) return {data:genre, success:true};
    return { error: 'Movie genre not found', success:false };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) return { error: 'Invalid id', success: false};
    const genre = await  this.genresService.remove(id);
    if (genre) return {data:genre, success:true};
    return { error: 'Movie genre not found', success:false};
  }
}
