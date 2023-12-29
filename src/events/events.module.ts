import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { EventService } from './services/events.service';
import { EventController } from './controllers/events.controller';

@Module({
  exports: [],
  imports: [],
  controllers: [EventController],
  providers: [PrismaClient, EventService],
})
export class EventModule {}
