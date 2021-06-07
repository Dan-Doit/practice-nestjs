import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@ArgsType()
export class MovieDTO implements Readonly<MovieDTO> {
  @Field()
  @IsNotEmpty()
  @IsNumber()
  id: number;

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

  @Field()
  @IsNotEmpty()
  @IsString()
  createdAt: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  updatedAt: string;
}
