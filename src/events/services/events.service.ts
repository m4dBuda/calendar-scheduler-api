import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';
import { CreateEventDto } from '../dtos/create-event.dto';
import { GetEventsFilterDto } from '../dtos/filter-events.dto';
import { EventEntity } from '../entities/event.entity';

@Injectable()
export class EventService {
  constructor(private readonly prisma: PrismaClient) {}

  public async getEvents(
    filterDto: GetEventsFilterDto = {},
  ): Promise<EventEntity[]> {
    const { title, description, startAt, endAt, createdAt } = filterDto;
    const where: Prisma.eventsWhereInput = {};

    if (title) {
      where.title = { contains: title };
    }
    if (description) {
      where.description = { contains: description };
    }

    if (startAt) {
      where.startAt = { gte: new Date(startAt) };
    }

    if (endAt) {
      where.endAt = { lte: new Date(endAt) };
    }

    if (createdAt) {
      const startDate = new Date(createdAt);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(createdAt);
      endDate.setHours(23, 59, 59, 999);
      where.createdAt = { gte: startDate, lte: endDate };
    }

    const events = await this.prisma.events.findMany({ where });

    return events;
  }

  public async getEventById(id: string): Promise<EventEntity> {
    const event = await this.prisma.events.findUnique({ where: { id } });

    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }

    return event;
  }
  public async createEvent(data: CreateEventDto): Promise<EventEntity> {
    if (data.startAt > data.endAt) {
      throw new BadRequestException('startAt must be before or equal to endAt');
    }

    await this.checkEventConflict(new Date(data.startAt));

    const event = await this.prisma.events.create({
      data: {
        title: data.title,
        description: data.description,
        startAt: new Date(data.startAt),
        endAt: new Date(data.endAt),
      },
    });

    return event;
  }

  public async updateEvent(
    id: string,
    data: Partial<EventEntity>,
  ): Promise<EventEntity> {
    const { title, description, startAt, endAt } = data;

    if (startAt) {
      await this.checkEventConflict(new Date(startAt), id);
    }

    if (startAt > endAt) {
      throw new BadRequestException('startAt must be before or equal to endAt');
    }

    const existingEvent = await this.prisma.events.findUnique({
      where: { id },
    });

    if (!existingEvent) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }

    const updatedEvent = await this.prisma.events.update({
      where: { id },
      data: {
        title: title ? title : undefined,
        description: description ? description : undefined,
        startAt: startAt ? new Date(startAt) : undefined,
        endAt: endAt ? new Date(endAt) : undefined,
        updatedAt: new Date(),
      },
    });

    return updatedEvent;
  }

  public async deleteEvent(id: string): Promise<EventEntity> {
    const event = await this.prisma.events.delete({ where: { id } });

    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }

    return event;
  }

  private async checkEventConflict(
    startAt: Date,
    excludeEventId?: string,
  ): Promise<void> {
    const conflictingEvent = await this.prisma.events.findFirst({
      where: {
        AND: [{ id: { not: excludeEventId } }, { startAt: startAt }],
      },
    });

    if (conflictingEvent) {
      throw new BadRequestException(
        'Another event is already scheduled at this time, please try another time',
      );
    }
    return;
  }
}
