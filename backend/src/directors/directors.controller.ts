import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DirectorsService } from './directors.service';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';

@Controller('directors')
export class DirectorsController {
  constructor(private readonly directorsService: DirectorsService) {}

  @Post()
  async create(@Body() createDirectorDto: CreateDirectorDto) {
    if ('tmdb_id' in createDirectorDto && 'name' in createDirectorDto) {
      return {
        data: await this.directorsService.create(createDirectorDto),
        success: true,
      };
    } else return { success: false, error: 'All fields is required' };
  }

  @Get()
  async findAll() {
    return { data: await this.directorsService.findAll(), success: true };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (!id.match(/^[0-9a-fA-F]{24}$/))
      return { error: 'Invalid id', success: false };
    const director = await this.directorsService.findOne(id);
    if (director) return { data: director, success: true };
    return { error: 'Movie director not found', success: false };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDirectorDto: UpdateDirectorDto,
  ) {
    if (!id.match(/^[0-9a-fA-F]{24}$/))
      return { error: 'Invalid id', success: false };
    const director = await this.directorsService.update(id, updateDirectorDto);
    if (director) return { data: director, success: true };
    return { error: 'Movie director not found', success: false };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    if (!id.match(/^[0-9a-fA-F]{24}$/))
      return { error: 'Invalid id', success: false };
    const director = await this.directorsService.remove(id);
    if (director) return { data: director, success: true };
    return { error: 'Movie director not found', success: false };
  }
}
