import { Controller, Get } from '@nestjs/common';
import { PingService } from './ping.service';

@Controller('ping')
export class PingController {
  constructor(private readonly pingService: PingService) {}

  @Get('/anything')
  async getAllBooks() {
    return this.pingService.pingEndpoint();
  }

  @Get('/history')
  async getPingHistory() {
    return this.pingService.getHistoricalData();
  }
}
