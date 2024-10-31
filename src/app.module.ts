// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { PingModule } from './modules/ping/ping.module';
import { databaseConfig } from './config/database.config';

@Module({
  imports: [
    PingModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync(databaseConfig),
    ScheduleModule.forRoot(),
  ],
})
export class AppModule {}
