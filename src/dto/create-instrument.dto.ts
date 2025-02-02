import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateInstrumentDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  readonly name: string;
}
