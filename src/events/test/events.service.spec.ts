import { Test } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { CreateEventDto } from '../dtos/create-event.dto';
import { GetEventsFilterDto } from '../dtos/filter-events.dto';
import { EventService } from '../services/events.service';

describe('EventService', () => {
  let service: EventService;
  let prisma: PrismaClient;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        EventService,
        {
          provide: PrismaClient,
          useValue: {
            events: {
              findMany: jest.fn().mockResolvedValue([]),
              findUnique: jest.fn().mockResolvedValue({ id: 'test' }),
              create: jest.fn().mockResolvedValue({ id: 'test' }),
              update: jest.fn().mockResolvedValue({ id: 'test' }),
              delete: jest.fn().mockResolvedValue({ id: 'test' }),
              findFirst: jest.fn().mockResolvedValue(null),
            },
          },
        },
      ],
    }).compile();

    service = moduleRef.get<EventService>(EventService);
    prisma = moduleRef.get<PrismaClient>(PrismaClient);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getEvents', () => {
    it('should return an array of events', async () => {
      const result = await service.getEvents(new GetEventsFilterDto());
      expect(result).toEqual([]);
    });
  });

  describe('getEventById', () => {
    it('should return a single event', async () => {
      const result = await service.getEventById('test');
      expect(result).toEqual({ id: 'test' });
    });
  });

  describe('createEvent', () => {
    it('should create a new event', async () => {
      const result = await service.createEvent(new CreateEventDto());
      expect(result).toEqual({ id: 'test' });
    });
  });

  describe('updateEvent', () => {
    it('should update an event', async () => {
      const result = await service.updateEvent('test', {});
      expect(result).toEqual({ id: 'test' });
    });
  });

  describe('deleteEvent', () => {
    it('should delete an event', async () => {
      const result = await service.deleteEvent('test');
      expect(result).toEqual({ id: 'test' });
    });
  });
});
