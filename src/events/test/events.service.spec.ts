import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { EventService } from '../services/events.service';

describe('EventsService', () => {
  let service: EventService;
  let prisma: PrismaClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventService,
        {
          provide: PrismaClient,
          useValue: {
            events: {
              findMany: jest.fn().mockResolvedValue([
                [
                  {
                    id: '1',
                    title: 'Test Event',
                    description: 'Test Description',
                    active: true,
                  },
                  {
                    id: '2',
                    title: 'Test Event',
                    description: 'Test Description',
                    active: true,
                  },
                  {
                    id: '3',
                    title: 'Test Event',
                    description: 'Test Description',
                    active: true,
                  },
                ],
              ]),
              findUnique: jest.fn().mockResolvedValue({
                id: '1',
                title: 'Test Event',
                description: 'Test Description',
                active: true,
              }),
              update: jest.fn().mockResolvedValue({
                id: '1',
                title: 'Test Event',
                description: 'Test Description',
                active: false,
              }),
              delete: jest.fn().mockResolvedValue({
                id: '1',
                title: 'Test Event',
                description: 'Test Description',
                active: false,
              }),
              create: jest.fn().mockResolvedValue({
                id: '1',
                title: 'Test Event',
                description: 'Test Description',
                active: true,
              }),
            },
          },
        },
      ],
    }).compile();

    service = module.get<EventService>(EventService);
    prisma = module.get<PrismaClient>(PrismaClient);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createEvent', () => {
    it('should create a new event', async () => {
      const newEvent = {
        title: 'Test Event',
        description: 'Test Description',
        startAt: new Date().toISOString(),
        endAt: new Date().toISOString(),
      };
      const result = await service.createEvent(newEvent);
      expect(result).toBeDefined();
      expect(prisma.events.create).toHaveBeenCalledWith({
        data: newEvent,
      });
    });
  });

  describe('getEventById', () => {
    it('should return an event', async () => {
      const result = await service.getEventById('1');
      expect(result).toBeDefined();
      expect(prisma.events.findUnique).toHaveBeenCalled();
    });
  });

  describe('getAllEvents', () => {
    it('should return all events', async () => {
      const result = await service.getEvents();
      expect(result).toBeDefined();
      expect(prisma.events.findMany).toHaveBeenCalled();
    });
  });

  describe('updateEvent', () => {
    it('should update an event', async () => {
      const result = await service.updateEvent('1', {
        active: false,
      });
      expect(result).toBeDefined();
      expect(prisma.events.update).toHaveBeenCalled();
    });
  });

  describe('deleteEvent', () => {
    it('should delete an event', async () => {
      const result = await service.deleteEvent('1');
      expect(result).toBeDefined();
      expect(prisma.events.delete).toHaveBeenCalled();
    });
  });
});
