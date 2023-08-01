import { IsNotEmpty, IsString, IsInt, Min, Max } from 'class-validator';

const currentYear = new Date().getFullYear();

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsInt()
  @Min(0)
  @Max(currentYear)
  readonly year: number;

  @IsString()
  @IsNotEmpty()
  readonly genre: string;
}
