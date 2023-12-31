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
                  title: 'Test Event 1',
                  description: 'Test Description 1',
                  startAt: new Date('2022-01-01T00:00:00Z'),
                  endAt: new Date('2022-01-01T01:00:00Z'),
                },
                {
                  id: 2,
                  title: 'Test Event 2',
                  description: 'Test Description 2',
                  startAt: new Date('2022-01-01T02:00:00Z'),
                  endAt: new Date('2022-01-01T03:00:00Z'),
                },
                {
                  id: 3,
                  title: 'Test Event 3',
                  description: 'Test Description 3',
                  startAt: new Date('2022-01-02T00:00:00Z'),
                  endAt: new Date('2022-01-02T01:00:00Z'),
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
      expect(Object.keys(result)).toHaveLength(2);
      expect(result['2022-01-01']).toHaveLength(2);
      expect(result['2022-01-02']).toHaveLength(1);
      expect(prisma.events.findMany).toHaveBeenCalled();
    });
  });
});
