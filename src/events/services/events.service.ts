import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient, Prisma, events } from '@prisma/client';
import { UpdateEventDto } from '../dtos/update-event.dto';
import { CreateEventDto } from '../dtos/create-event.dto';
import { GetEventsFilterDto } from '../dtos/filter-events.dto';
@Injectable()
export class EventService {
  constructor(private readonly prisma: PrismaClient) {}

  public createEvent(data: CreateEventDto): Promise<events> {
    return this.prisma.events.create({ data });
  }

  public async getEvents(
    filterDto: GetEventsFilterDto = {},
  ): Promise<events[]> {
    const { title, description, startAt, endAt, active } = filterDto;

    const where: Prisma.eventsWhereInput = {
      active: true,
    };
    if (title) {
      where.title = { contains: title };
    }
    if (description) {
      where.description = { contains: description };
    }
    if (startAt) {
      where.startAt = { gte: startAt };
    }
    if (endAt) {
      where.endAt = { lte: endAt };
    }
    if (active) {
      where.active = active;
    }
    const events = await this.prisma.events.findMany({ where: where });
    if (!events) {
      throw new NotFoundException('No events found');
    }
    return events;
  }

  public async getEventById(id: string): Promise<events> {
    const event = await this.prisma.events.findUnique({ where: { id } });
    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }
    return event;
  }

  public async updateEvent(id: string, data: UpdateEventDto): Promise<events> {
    data.updatedAt = new Date();
    const event = await this.prisma.events.update({ where: { id }, data });
    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }
    return event;
  }

  public async deleteEvent(id: string): Promise<events> {
    const event = await this.prisma.events.delete({ where: { id } });
    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }
    return event;
  }
}
