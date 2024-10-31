import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import axios from 'axios';
import * as cron from 'node-cron';
import { PingDAO } from './dao/ping.dao';
import { PingResponseDto } from '../ping/dto/ping-response.dto';
import { HTTPBIN_ORG_URL } from '../../common/utils/constants';

@Injectable()
export class PingService implements OnModuleDestroy {
  private readonly logger = new Logger(PingService.name);
  private cronJob: cron.ScheduledTask;

  constructor(private readonly pingDAO: PingDAO) {
    this.cronJob = cron.schedule('*/5 * * * *', () => this.pingEndpoint());
  }

  async pingEndpoint() {
    try {
      const randomPayload = { key: Math.random().toString(36).substring(7) };
      const axiosResponse = await axios.post(HTTPBIN_ORG_URL, randomPayload);

      const responseDto: PingResponseDto = {
        args: axiosResponse.data.args || {},
        data: axiosResponse.data.data || '',
        files: axiosResponse.data.files || {},
        form: axiosResponse.data.form || {},
        headers: Object.fromEntries(
          Object.entries(axiosResponse.headers).map(([key, value]) => [
            key,
            String(value),
          ]),
        ),
        json: axiosResponse.data.json || null,
        method: axiosResponse.config.method?.toUpperCase() || 'GET',
        origin: axiosResponse.data.origin,
        url: axiosResponse.data.url,
      };

      await this.pingDAO.create(responseDto);
      this.logger.log('Ping response saved to database.');
    } catch (error) {
      this.logger.error('Failed to ping endpoint', error.message, error.stack);
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

  // Clean up cron job on module destruction
  onModuleDestroy() {
    if (this.cronJob) {
      this.cronJob.stop(); // Stop the cron job
    }
  }
}
