import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  describe('deleteOne', () => {
    it('deletes a movie', async () => {
      service.addMovie({
        title: 'Test Movie',
        genre: 'test',
        filmed: '2000-01-10',
        discription: 'random',
        poster: 'url',
      });
      const beforeDelete = await service.getAllMovies();
      // service.deleteOne(1);
      const afterDelete = await service.getAllMovies();
      expect(afterDelete.length).toBeLessThan(beforeDelete.length);
    });
    it('should return a 404', () => {
      try {
        // service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('addMovie', () => {
    it('should create a movie', async () => {
      const beforeCreate = await service.getAllMovies();
      service.addMovie({
        title: 'Test Movie',
        genre: 'test',
        filmed: '2000-01-10',
        discription: 'random',
        poster: 'url',
      });
      const afterCreate = await service.getAllMovies();
      expect(afterCreate.length).toBeGreaterThan(beforeCreate.length);
    });
  });
});
