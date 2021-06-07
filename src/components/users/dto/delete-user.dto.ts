import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@ArgsType()
export class DeleteUserArgs implements Readonly<DeleteUserArgs> {
  @Field()
  @IsNotEmpty()
  @IsString()
  email: string;
}
