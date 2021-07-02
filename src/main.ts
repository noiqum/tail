import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3005).then(() => {
    console.log('app is running at port 3005');
  });
}
bootstrap();
