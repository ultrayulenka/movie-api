/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Express } from 'express';

@ValidatorConstraint({ name: 'string-or-number', async: false })
export class IsNumberOrString implements ValidatorConstraintInterface {
  validate(text: any, args: ValidationArguments) {
    return typeof text === 'number' || typeof text === 'string';
  }

  defaultMessage(args: ValidationArguments) {
    return '($value) must be number or string';
  }
}

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @Validate(IsNumberOrString)
  @IsNotEmpty()
  readonly year: number;

  @IsString()
  @IsNotEmpty()
  readonly genre: string;
}

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  poster?: Express.Multer.File;
}
