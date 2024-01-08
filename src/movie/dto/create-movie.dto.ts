import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Express } from 'express';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  readonly year: number;

  @IsString()
  @IsNotEmpty()
  readonly genre: string;
}

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  poster?: Express.Multer.File;
}
