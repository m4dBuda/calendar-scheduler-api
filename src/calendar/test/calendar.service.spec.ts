import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { CalendarService } from '../services/calendar.service';

describe('CalendarService', () => {
  let service: CalendarService;
  let prisma: PrismaClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CalendarService,
        {
          provide: PrismaClient,
          useValue: {
            events: {
              findMany: jest.fn().mockResolvedValue([
                {
                  id: 1,
                  title: 'Test Event',
                  description: 'Test Description',
                  startAt: new Date(),
                  endAt: new Date(),
                },
              ]),
            },
          },
        },
      ],
    }).compile();

    service = module.get<CalendarService>(CalendarService);
    prisma = module.get<PrismaClient>(PrismaClient);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getEventsByDay', () => {
    it('should return events grouped by day', async () => {
      const result = await service.getEventsByDay();
      expect(result).toBeDefined();
      expect(Object.keys(result)).toHaveLength(1);
      expect(prisma.events.findMany).toHaveBeenCalled();
    });
  });
});
