import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@ArgsType()
export class CreateMovieArgs implements Readonly<CreateMovieArgs> {
  @Field()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  poster: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  filmed: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  genre: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  discription: string;
}
