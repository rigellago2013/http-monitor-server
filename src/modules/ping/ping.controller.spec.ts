// src/ping/ping.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { PingController } from './ping.controller';
import { PingService } from './ping.service';

describe('PingController', () => {
  let controller: PingController;
  let service: PingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PingController],
      providers: [
        {
          provide: PingService,
          useValue: {
            pingEndpoint: jest.fn().mockResolvedValue('Pinged successfully'),
            getHistoricalData: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    controller = module.get<PingController>(PingController);
    service = module.get<PingService>(PingService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllBooks', () => {
    it('should call pingService.pingEndpoint and return the result', async () => {
      const result = await controller.getAllBooks();
      expect(service.pingEndpoint).toHaveBeenCalled();
      expect(result).toEqual('Pinged successfully');
    });
  });

  describe('getPingHistory', () => {
    it('should call pingService.getHistoricalData and return the result', async () => {
      const result = await controller.getPingHistory();
      expect(service.getHistoricalData).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });
});
