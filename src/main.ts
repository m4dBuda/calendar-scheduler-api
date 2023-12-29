import { NestFactory } from '@nestjs/core';
import * as swaggerUi from 'swagger-ui-express';
import * as fs from 'fs';
import { AppModule } from './app.module';
import * as YAML from 'yaml';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerDocument = YAML.parse(
    fs.readFileSync('./api-doc.swagger.yaml', 'utf8'),
  );
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.enableCors();
  await app.listen(3000);
}
bootstrap();
