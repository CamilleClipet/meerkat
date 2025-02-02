import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto } from '../dto/create-genre.dto';

@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Post()
  async createGenre(@Res() response, @Body() createGenreDto: CreateGenreDto) {
    const newGenre = await this.genreService.createGenre(createGenreDto);
    return response.status(HttpStatus.CREATED).json({
      message: 'Genre has been created successfully',
      newGenre,
    });
  }

  @Get()
  async getAllGenres(@Res() response) {
    const allGenres = await this.genreService.findAllGenres();
    return response.status(HttpStatus.FOUND).json(allGenres);
  }
}
