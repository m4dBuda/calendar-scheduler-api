import { EventEntity } from 'src/events/entities/event.entity';

export class EventsByDayDto {
  [key: string]: EventEntity[];
}
