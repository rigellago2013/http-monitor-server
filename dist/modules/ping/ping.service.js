"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var PingService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PingService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const ping_gateway_1 = require("./ping.gateway");
const cron = require("node-cron");
const ping_dao_1 = require("./dao/ping.dao");
let PingService = PingService_1 = class PingService {
    constructor(pingDAO, pingGateway) {
        this.pingDAO = pingDAO;
        this.pingGateway = pingGateway;
        this.logger = new common_1.Logger(PingService_1.name);
        cron.schedule('10 * * * * *', () => this.pingEndpoint());
    }
    async pingEndpoint() {
        try {
            const randomPayload = { key: Math.random().toString(36).substring(7) };
            const axiosResponse = await axios_1.default.post('https://httpbin.org/anything', randomPayload);
            const responseDto = {
                args: axiosResponse.data.args || {},
                data: axiosResponse.data.data || '',
                files: axiosResponse.data.files || {},
                form: axiosResponse.data.form || {},
                headers: Object.fromEntries(Object.entries(axiosResponse.headers).map(([key, value]) => [key, String(value)])),
                json: axiosResponse.data.json || null,
                method: axiosResponse.config.method?.toUpperCase() || 'GET',
                origin: axiosResponse.data.origin,
                url: axiosResponse.data.url,
            };
            const savedResponse = await this.pingDAO.create(responseDto);
            this.logger.log('Ping response saved to database.');
            this.pingGateway.sendUpdate(savedResponse);
        }
        catch (error) {
            this.logger.error('Failed to ping endpoint', error);
        }
    }
    async getHistoricalData() {
        try {
            return await this.pingDAO.find();
        }
        catch (error) {
            this.logger.error('Failed to retrieve historical data', error);
            throw new Error('Could not fetch historical data');
        }
    }
};
exports.PingService = PingService;
exports.PingService = PingService = PingService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [ping_dao_1.PingDAO,
        ping_gateway_1.PingGateway])
], PingService);
//# sourceMappingURL=ping.service.js.map