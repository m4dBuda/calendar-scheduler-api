import { Module } from '@nestjs/common';
import { CalendarController } from './controllers/calendar.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [],
  controllers: [CalendarController],
  providers: [PrismaClient],
})
export class CalendarModule {}
