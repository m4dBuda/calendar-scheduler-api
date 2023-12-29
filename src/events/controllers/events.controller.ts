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

@Controller('events')
export class EventController {
  constructor(private eventService: EventService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  createEvent(@Body() data: CreateEventDto) {
    console.log(data);
    return this.eventService.createEvent(data);
  }

  @Get()
  getEvents(@Query() filterDto: GetEventsFilterDto) {
    return this.eventService.getEvents(filterDto);
  }

  @Get(':id')
  getEventById(@Param('id') id: string) {
    return this.eventService.getEventById(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  updateEvent(@Param('id') id: string, @Body() data: UpdateEventDto) {
    return this.eventService.updateEvent(id, data);
  }

  @Delete(':id')
  deleteEvent(@Param('id') id: string) {
    return this.eventService.deleteEvent(id);
  }
}
