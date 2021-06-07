import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@ArgsType()
export class UpdateUserArgs implements Readonly<UpdateUserArgs> {
  @Field()
  @IsOptional()
  @IsString()
  password: string;

  @Field()
  @IsOptional()
  @IsString()
  avatar: string;

  @Field()
  @IsOptional()
  @IsString()
  name: string;
}
