import { Module } from '@nestjs/common';
import { CommentsResolver } from './comments.resolver';
import { CommentsService } from './comments.service';
import {
  CommentRepository,
  CommentRepositoryProvider,
} from './repositories/comment.repository';
import {
  MovieRepository,
  MovieRepositoryProvider,
} from '../movies/repositories/movie.repository';
import {
  UserRepository,
  UserRepositoryProvider,
} from '../users/repositories/user.repository';

@Module({
  imports: [MovieRepository, UserRepository],
  providers: [
    CommentsResolver,
    CommentsService,
    CommentRepository,
    MovieRepository,
    UserRepository,
    MovieRepositoryProvider,
    UserRepositoryProvider,
    CommentRepositoryProvider,
    CommentRepositoryProvider,
  ],
})
export class CommentsModule {}
