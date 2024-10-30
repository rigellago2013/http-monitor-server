import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { corsConfig } from './config/cors.config';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    // Allow socket.io to use CORS
  app.useWebSocketAdapter(new IoAdapter(app));
  app.enableCors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        '*',
        'https://http-monitor-client.vercel.app',
        'https://http-monitor-client-6kioj8j41-rigels-projects-85d99a61.vercel.app'
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
