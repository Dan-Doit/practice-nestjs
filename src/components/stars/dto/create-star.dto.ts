import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@ArgsType()
export class CreateStarDTO implements Readonly<CreateStarDTO> {
  @Field()
  @IsNotEmpty()
  @IsNumber()
  star: number;

  @Field()
  @IsNotEmpty()
  @IsNumber()
  movieId: number;
}
