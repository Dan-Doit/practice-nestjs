import { Injectable } from '@nestjs/common';
import { MovieRepository } from '../movies/repositories/movie.repository';
import { UserRepository } from '../users/repositories/user.repository';
import { Comment } from '../../model/comment.entity';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { CommentRepository } from './repositories/comment.repository';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly userRepository: UserRepository,
    private readonly movieRepository: MovieRepository,
  ) {}
  async createComment(user: any, commentData: CreateCommentDTO) {
    try {
      const foundUser = await this.userRepository.findByIds([user.id]);
      const foundMovie = await this.movieRepository.findByIds([
        commentData.movieId,
      ]);
      const newComment = new Comment();

      newComment.user = foundUser[0];
      newComment.movie = foundMovie[0];
      newComment.comment = commentData.comment;

      this.commentRepository.save(newComment);

      return 'created comment!';
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
