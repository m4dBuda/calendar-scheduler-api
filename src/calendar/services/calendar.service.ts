import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { EventEntity } from 'src/events/entities/event.entity';
import { EventsByDayDto } from '../dto/calendar.dto';

@Injectable()
export class CalendarService {
  constructor(private readonly prisma: PrismaClient) {}

  public async getEventsByDay(): Promise<EventsByDayDto> {
    const events: EventEntity[] = await this.prisma.events.findMany();
    if (!events || events.length <= 0) {
      throw new NotFoundException(`No events found`);
    }
    return this.groupEventsByDay(events);
  }

  private groupEventsByDay(events: EventEntity[]): EventsByDayDto {
    const eventsByDay: { [key: string]: EventEntity[] } = {};

    for (const event of events) {
      const date = event.startAt.toISOString().split('T')[0];

      if (!eventsByDay[date]) {
        eventsByDay[date] = [];
      }

      eventsByDay[date].push(event);
    }

    return eventsByDay;
  }
}
