import { IsOptional, IsString, Matches, IsDateString } from 'class-validator';

export class GetEventsFilterDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/, {
    message:
      'startAt must be a valid date-time string, e.g. 2023-12-30 14:42:37',
  })
  startAt?: string;

  @IsOptional()
  @IsDateString()
  endAt?: string;

  @IsOptional()
  @IsDateString()
  createdAt?: string;
}
