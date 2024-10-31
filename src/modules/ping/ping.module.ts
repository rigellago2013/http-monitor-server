import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Response, ResponseSchema } from 'src/schemas/response.schema';
import { PingDAO } from './dao/ping.dao';
import { PingController } from './ping.controller';
import { PingService } from './ping.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Response.name, schema: ResponseSchema },
    ]),
  ],
  providers: [PingDAO, PingService],
  controllers: [PingController],
})
export class PingModule {}
