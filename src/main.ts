import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { corsConfig } from './config/cors.config';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    // Allow socket.io to use CORS
  app.useWebSocketAdapter(new IoAdapter(app));
  app.enableCors(corsConfig); 
  await app.listen(3000);
}
bootstrap();
