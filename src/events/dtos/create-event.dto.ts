import { IsString, IsOptional, IsBoolean, IsDateString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsDateString()
  startAt: string;

  @IsDateString()
  endAt: string;
}
