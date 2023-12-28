import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CalendarService } from '../services/calendar.service';

@Controller('calendar')
export class CalendarController {
  constructor(private calendarService: CalendarService) {}

  @Post()
  async createEvent(@Body() data: Prisma.calendarCreateInput) {
    return this.calendarService.createEvent(data);
  }

  @Get()
  async getEvents() {
    return this.calendarService.getEvents();
  }

  @Get(':id')
  async getEventById(@Param('id') id: string) {
    return this.calendarService.getEventById(id);
  }

  @Put(':id')
  async updateEvent(
    @Param('id') id: string,
    @Body() data: Prisma.calendarUpdateInput,
  ) {
    return this.calendarService.updateEvent(id, data);
  }

  @Delete(':id')
  async deleteEvent(@Param('id') id: string) {
    return this.calendarService.deleteEvent(id);
  }
}
