// src/core/database/ping.dao.ts
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Response, ResponseDocument } from '../../../schemas/response.schema';
import { PingResponseDto } from '../dto/ping-response.dto';

@Injectable()
export class PingDAO {
  constructor(
    @InjectModel(Response.name) private responseModel: Model<ResponseDocument>,
  ) {}

  async create(responseDto: PingResponseDto): Promise<Response> {
    const createdResponse = new this.responseModel(responseDto);
    return createdResponse.save();
  }

  async find(): Promise<Response[]> {
    return this.responseModel.find().exec();
  }
}
