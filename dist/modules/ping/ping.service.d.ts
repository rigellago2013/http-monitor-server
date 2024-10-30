import { PingGateway } from './ping.gateway';
import { PingDAO } from './dao/ping.dao';
export declare class PingService {
    private readonly pingDAO;
    private pingGateway;
    private readonly logger;
    constructor(pingDAO: PingDAO, pingGateway: PingGateway);
    pingEndpoint(): Promise<void>;
    getHistoricalData(): Promise<import("../../schemas/response.schema").Response[]>;
}
