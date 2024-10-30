import { PingService } from './ping.service';
export declare class PingController {
    private readonly pingService;
    constructor(pingService: PingService);
    getAllBooks(): Promise<void>;
    getPingHistory(): Promise<import("../../schemas/response.schema").Response[]>;
}
