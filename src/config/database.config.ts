import { ConfigService } from '@nestjs/config';

export const databaseConfig = {
  useFactory: (configService: ConfigService) => ({
    uri: configService.get<string>('MONGO_URI'),
  }),
  inject: [ConfigService],
};
