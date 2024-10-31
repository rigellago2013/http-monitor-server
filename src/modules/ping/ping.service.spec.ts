import { Test, TestingModule } from '@nestjs/testing';
import { PingService } from './ping.service';
import { PingDAO } from './dao/ping.dao';
import axios from 'axios';
import { HTTPBIN_ORG_URL } from '../../common/utils/constants';
import { PingResponseDto } from '../ping/dto/ping-response.dto';
import { Logger } from '@nestjs/common';

jest.mock('axios');

const mockPingDAO = {
  create: jest.fn(),
  find: jest.fn(),
};

const loggerErrorSpy = jest
  .spyOn(Logger.prototype, 'error')
  .mockImplementation(() => {});

describe('PingService', () => {
  let service: PingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PingService, { provide: PingDAO, useValue: mockPingDAO }],
    }).compile();

    service = module.get<PingService>(PingService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    service.onModuleDestroy(); // Stops the cron job after each test
  });

  describe('pingEndpoint', () => {
    it('should successfully ping the endpoint and save the response', async () => {
      const mockResponse = {
        data: {
          args: {},
          data: '',
          files: {},
          form: {},
          json: null,
          url: HTTPBIN_ORG_URL,
          origin: '127.0.0.1',
        },
        headers: {},
        config: {
          method: 'post',
        },
      };

      (axios.post as jest.Mock).mockResolvedValue(mockResponse);

      const responseDto: PingResponseDto = {
        args: {},
        data: '',
        files: {},
        form: {},
        headers: {},
        json: null,
        method: 'POST',
        origin: '127.0.0.1',
        url: HTTPBIN_ORG_URL,
      };

      await service.pingEndpoint();

      expect(mockPingDAO.create).toHaveBeenCalledWith(responseDto); // Only validate DAO call
    });

    it('should log an error if the ping fails', async () => {
      const errorMessage = 'Network Error';
      (axios.post as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await service.pingEndpoint();

      expect(loggerErrorSpy).toHaveBeenCalledWith(
        'Failed to ping endpoint',
        errorMessage,
        expect.any(String),
      );
    });
  });

  describe('getHistoricalData', () => {
    it('should return historical data from the DAO', async () => {
      const mockHistoricalData = [{ id: 1, url: HTTPBIN_ORG_URL }];
      mockPingDAO.find.mockResolvedValue(mockHistoricalData);

      const result = await service.getHistoricalData();

      expect(result).toEqual(mockHistoricalData);
      expect(mockPingDAO.find).toHaveBeenCalled();
    });

    it('should throw an error if retrieval fails', async () => {
      const errorMessage = 'Database Error';
      mockPingDAO.find.mockRejectedValue(new Error(errorMessage));

      await expect(service.getHistoricalData()).rejects.toThrow(
        'Could not fetch historical data',
      );
    });
  });

  describe('onModuleDestroy', () => {
    it('should stop the cron job', () => {
      const stopSpy = jest.spyOn(service['cronJob'], 'stop');
      service.onModuleDestroy();
      expect(stopSpy).toHaveBeenCalled();
    });
  });
});
