import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Pic Pay Simple Api')
  .setDescription('Payment Api')
  .setVersion('1.0')
  .build();
