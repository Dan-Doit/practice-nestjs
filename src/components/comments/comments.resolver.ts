import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../../auth/current-user.decorator';
import { GqlAuthGuard } from '../../auth/guards/gql-auth.guard';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { CommentsService } from './comments.service';

@Resolver()
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}
  @UseGuards(GqlAuthGuard)
  @Mutation('create_comment')
  async create_comment(
    @CurrentUser() user: any,
    @Args() commentData: CreateCommentDTO,
  ) {
    return this.commentsService.createComment(user, commentData);
  }
}
