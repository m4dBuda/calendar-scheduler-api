import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class CalendarService {
  constructor(private $prisma: PrismaClient) {}

  public async createEvent(data: Prisma.calendarCreateInput) {
    return this.$prisma.calendar.create({ data });
  }

  public async getEvents() {
    return this.$prisma.calendar.findMany();
  }

  public async getEventById(id: string) {
    return this.$prisma.calendar.findUnique({ where: { id } });
  }

  public async updateEvent(id: string, data: Prisma.calendarUpdateInput) {
    return this.$prisma.calendar.update({ where: { id }, data });
  }

  public async deleteEvent(id: string) {
    return this.$prisma.calendar.delete({ where: { id } });
  }
}
