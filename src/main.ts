import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
// Integrate Validation Pipe
app.useGlobalPipes(new ValidationPipe({
  whitelist:true,
  forbidNonWhitelisted:true,
  transform:true
}))
  const configService = app.get(ConfigService)
  const PORT = configService.get<number>('PORT') ?? 5000
  await app.listen(PORT,()=>{
    console.log(`app running on http://localhost:${PORT}`)
  });
}
await bootstrap();
