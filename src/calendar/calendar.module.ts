import { Module } from '@nestjs/common';
import { CalendarController } from './controllers/calendar.controller';
import { CalendarService } from './services/calendar.service';
import { PrismaClient } from '@prisma/client';

@Module({
  exports: [],
  imports: [],
  controllers: [CalendarController],
  providers: [PrismaClient, CalendarService],
})
export class CalendarModule {}
