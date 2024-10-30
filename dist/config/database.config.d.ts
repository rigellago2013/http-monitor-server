import { ConfigService } from '@nestjs/config';
export declare const databaseConfig: {
    useFactory: (configService: ConfigService) => {
        uri: string;
    };
    inject: (typeof ConfigService)[];
};
