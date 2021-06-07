import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@ArgsType()
export class CreateCommentDTO implements Readonly<CreateCommentDTO> {
  @Field()
  @IsNotEmpty()
  @IsString()
  comment: string;

  @Field()
  @IsNotEmpty()
  @IsNumber()
  movieId: number;
}
