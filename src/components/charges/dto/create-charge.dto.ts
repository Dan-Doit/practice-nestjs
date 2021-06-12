import { ArgsType, Field } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

@ArgsType()
export class ChargeDTO implements Readonly<ChargeDTO> {
  @Field()
  @IsNotEmpty()
  @IsString()
  point: number;

  @Field()
  @IsNotEmpty()
  @IsString()
  chargedby: string;

  @Field()
  @IsNotEmpty()
  @IsBoolean()
  valid: boolean;
}
