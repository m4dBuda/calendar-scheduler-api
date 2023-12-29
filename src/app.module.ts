import { Module } from '@nestjs/common';
import { CalendarModule } from './calendar/calendar.module';
import { EventModule } from './events/events.module';

@Module({
  exports: [],
  imports: [CalendarModule, EventModule],
})
export class AppModule {}
