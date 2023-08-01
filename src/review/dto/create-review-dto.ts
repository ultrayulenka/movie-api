import { IsString, IsInt, Min, Max } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  readonly text: string;

  @IsInt()
  @Min(0)
  @Max(10)
  readonly rate: number;
}
