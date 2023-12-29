import { Controller, Get } from '@nestjs/common';
import { CalendarService } from '../services/calendar.service';
import { EventsByDayDto } from '../dto/calendar.dto';

@Controller('calendar')
export class CalendarController {
  constructor(private calendarService: CalendarService) {}

  @Get()
  async getEventsByDay(): Promise<EventsByDayDto> {
    return this.calendarService.getEventsByDay();
  }
}
