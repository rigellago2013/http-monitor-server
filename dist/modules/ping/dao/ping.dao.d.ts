import { Model } from 'mongoose';
import { Response, ResponseDocument } from '../../../schemas/response.schema';
import { PingResponseDto } from '../dto/ping-response.dto';
export declare class PingDAO {
    private responseModel;
    constructor(responseModel: Model<ResponseDocument>);
    create(responseDto: PingResponseDto): Promise<Response>;
    find(): Promise<Response[]>;
}
