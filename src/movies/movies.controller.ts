import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll(): string {
    return 'this will return all movies';
  }

  @Get('/search')
  search(@Query('year') year: string): string {
    return `this will find query data with ${year}`;
  }

  @Get('/:id')
  getOne(@Param('id') id: string): string {
    return `this will return one movie with id : ${id}`;
  }

  @Post()
  create(@Body() movieData): string {
    return movieData;
  }

  @Delete('/:id')
  delete(@Param('id') id: string): string {
    return `this will delete a movie with id : ${id}`;
  }

  @Patch('/:id')
  patch(@Param('id') id: string, @Body() movieData): string {
    return {
      movieID: id,
      ...movieData,
    };
  }
}
