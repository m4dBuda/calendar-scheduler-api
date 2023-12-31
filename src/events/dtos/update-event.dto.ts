import { IsString, IsDateString, IsOptional } from 'class-validator';

export class UpdateEventDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  startAt?: Date;

  @IsOptional()
  @IsDateString()
  endAt?: Date;
}
