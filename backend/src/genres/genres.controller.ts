import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GenresService } from './genres.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Post()
  create(@Body() createGenreDto: CreateGenreDto) {
    if('tmdb_id' in createGenreDto && 'name' in createGenreDto){
      return {data:this.genresService.create(createGenreDto), success:true};
    }
    else  return {success:false, error:"All fields are required"}
  }

  @Get()
  findAll() {
    return {data:this.genresService.findAll(), success:true};
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) return { error: 'Invalid id',success: false};
    const genre = this.genresService.findOne(+id);
    if (genre) return {data:genre, success:true};
    return { error: 'Movie genre not found', success:false};
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGenreDto: UpdateGenreDto) {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) return { error: 'Invalid id', success: false};
    const genre = this.genresService.update(+id, updateGenreDto);
    if (genre) return {data:genre, success:true};
    return { error: 'Concert genre not found', success:false };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) return { error: 'Invalid id', success: false};
    const genre = this.genresService.remove(+id);
    if (genre) return {data:genre, success:true};
    return { error: 'Movie genre not found', success:false};
  }
}
