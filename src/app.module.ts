import { Module } from '@nestjs/common';
import { CalendarModule } from './calendar/calendar.module';
import { EventModule } from './events/events.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  exports: [],
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),
    CalendarModule,
    EventModule,
  ],
})
export class AppModule {}
