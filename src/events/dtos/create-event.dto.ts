import { IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  startAt: string;

  @IsDateString()
  endAt: string;
}
