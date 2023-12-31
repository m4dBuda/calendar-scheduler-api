import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsDateString,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  @IsNotEmpty()
  startAt: string;

  @IsDateString()
  @IsNotEmpty()
  endAt: string;
}
