import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly lastName: string;

  @IsNumber()
  @IsNotEmpty()
  readonly zipCode: number;

  @IsArray()
  readonly instruments: string[];

  @IsArray()
  @IsNotEmpty()
  readonly genres: string[];
}
