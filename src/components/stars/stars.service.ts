import { Injectable } from '@nestjs/common';
import { CreateStarDTO } from './dto/create-star.dto';
import { MovieRepository } from '../movies/repositories/movie.repository';
import { UserRepository } from '../users/repositories/user.repository';
import { StarRepository } from './repositories/star.repository';
import { Star } from '../../model/star.entity';

@Injectable()
export class StarsService {
  constructor(
    private readonly starRepository: StarRepository,
    private readonly userRepository: UserRepository,
    private readonly movieRepository: MovieRepository,
  ) {}
  async createStar(user: any, starData: CreateStarDTO) {
    try {
      const starId = await this.starRepository.toggleStar(
        user.id,
        starData.movieId,
      );
      if (starId) {
        const result = await this.starRepository.updateStar(
          starId,
          starData.star,
        );
        return result.affected > 0 ? true : false;
      } else {
        const newStar = new Star();
        const foundMovie = await this.movieRepository.findByIds([
          starData.movieId,
        ]);
        const foundUser = await this.userRepository.findByIds([user.id]);

        newStar.user = foundUser[0];
        newStar.movie = foundMovie[0];
        newStar.star = starData.star;

        this.starRepository.save(newStar);

        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
