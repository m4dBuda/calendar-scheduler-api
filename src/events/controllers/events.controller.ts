import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { EventService } from '../services/events.service';
import { CreateEventDto } from '../dtos/create-event.dto';
import { UpdateEventDto } from '../dtos/update-event.dto';
import { GetEventsFilterDto } from '../dtos/filter-events.dto';
import { EventEntity } from '../entities/event.entity';

@Controller('events')
export class EventController {
  constructor(private eventService: EventService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  createEvent(@Body() data: CreateEventDto): Promise<EventEntity> {
    return this.eventService.createEvent(data);
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  getEvents(@Query() filterDto?: GetEventsFilterDto): Promise<EventEntity[]> {
    return this.eventService.getEvents(filterDto);
  }

  @Get(':id')
  getEventById(@Param('id') id: string): Promise<EventEntity> {
    return this.eventService.getEventById(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  updateEvent(
    @Param('id') id: string,
    @Body() data: UpdateEventDto,
  ): Promise<EventEntity> {
    return this.eventService.updateEvent(id, data);
  }

  @Delete(':id')
  deleteEvent(@Param('id') id: string): Promise<EventEntity> {
    return this.eventService.deleteEvent(id);
  }
}
