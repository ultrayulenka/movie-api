import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt, Min, Max } from 'class-validator';
import { Express } from 'express';

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

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  poster?: Express.Multer.File;
}
