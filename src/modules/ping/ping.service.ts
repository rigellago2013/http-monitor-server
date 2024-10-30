import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { PingGateway } from './ping.gateway';
import * as cron from 'node-cron';
import { PingDAO } from './dao/ping.dao';
import { PingResponseDto } from '../ping/dto/ping-response.dto';

@Injectable()
export class PingService {
  private readonly logger = new Logger(PingService.name);

  constructor(
    private readonly pingDAO: PingDAO,
    private pingGateway: PingGateway,
  ) {
    cron.schedule('10 * * * * *', () => this.pingEndpoint());
  }

  async pingEndpoint() {
    try {
      const randomPayload = { key: Math.random().toString(36).substring(7) };
      const axiosResponse = await axios.post('https://httpbin.org/anything', randomPayload);

      // Map axios response to ResponseDto
      const responseDto: PingResponseDto = {
        args: axiosResponse.data.args || {},
        data: axiosResponse.data.data || '',
        files: axiosResponse.data.files || {},
        form: axiosResponse.data.form || {},
        headers: Object.fromEntries(
          Object.entries(axiosResponse.headers).map(([key, value]) => [key, String(value)])
        ),
        json: axiosResponse.data.json || null,
        method: axiosResponse.config.method?.toUpperCase() || 'GET',
        origin: axiosResponse.data.origin,
        url: axiosResponse.data.url,
      };

      const savedResponse = await this.pingDAO.create(responseDto);
      this.logger.log('Ping response saved to database.');
      this.pingGateway.sendUpdate(savedResponse);
    } catch (error) {
      this.logger.error('Failed to ping endpoint', error);
    }
  }

  async getHistoricalData() {
    try {
      return await this.pingDAO.find();
    } catch (error) {
      this.logger.error('Failed to retrieve historical data', error);
      throw new Error('Could not fetch historical data');
    }
  }
}