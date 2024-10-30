import { Server } from 'socket.io';
export declare class PingGateway {
    server: Server;
    sendUpdate(data: any): void;
}
