import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateGenreDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  name: string;
}
