import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  @Get('/search')
  search(@Query('year') year: number): string {
    return `this will find query data with ${year}`;
  }

  @Get('/:id')
  getOne(@Param('id') id: number): Movie {
    return this.moviesService.getOne(id);
  }

  @Post()
  create(@Body() movieData: CreateMovieDTO): void {
    return this.moviesService.create(movieData);
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.moviesService.deleteOne(id);
  }

  @Patch('/:id')
  patch(@Param('id') id: number, @Body() movieData: UpdateMovieDTO) {
    return this.moviesService.update(id, movieData);
  }
}
