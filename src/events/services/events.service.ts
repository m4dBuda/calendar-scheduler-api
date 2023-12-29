import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient, Prisma, events } from '@prisma/client';
import { UpdateEventDto } from '../dtos/update-event.dto';
import { CreateEventDto } from '../dtos/create-event.dto';
import { GetEventsFilterDto } from '../dtos/filter-events.dto';

@Injectable()
export class EventService {
  constructor(private readonly prisma: PrismaClient) {}

  public async createEvent(data: CreateEventDto): Promise<events> {
    return await this.prisma.events.create({ data });
  }

  public async getEvents(filterDto: GetEventsFilterDto): Promise<events[]> {
    const where: Prisma.eventsWhereInput = {
      active: true,
    };
    if (filterDto.title) {
      where.title = { contains: filterDto.title };
    }
    if (filterDto.description) {
      where.description = { contains: filterDto.description };
    }
    if (filterDto.startAt) {
      where.startAt = { gte: filterDto.startAt };
    }
    if (filterDto.endAt) {
      where.endAt = { lte: filterDto.endAt };
    }
    if (filterDto.active) {
      where.active = filterDto.active;
    }

    const promise = await this.prisma.events.findMany({ where: where });
    if (promise.length <= 0) {
      throw new NotFoundException('No events found');
    }
    return promise;
  }

  public async getEventById(id: string): Promise<events> {
    const event = await this.prisma.events.findUnique({ where: { id } });
    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }
    return event;
  }

  public async updateEvent(id: string, data: UpdateEventDto): Promise<events> {
    const event = await this.getEventById(id);
    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }
    return await this.prisma.events.update({ where: { id }, data });
  }

  public async deleteEvent(id: string): Promise<events> {
    const event = await this.getEventById(id);
    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }
    return await this.prisma.events.delete({ where: { id } });
  }
}
