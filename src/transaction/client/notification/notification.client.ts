import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class NotificationClient {
  private readonly logger = new Logger(NotificationClient.name);

  constructor(private readonly httpService: HttpService) {}

  public notify() {
    this.httpService.axiosRef
      .post('https://util.devi.tools/api/v1/notify')
      .then((data) => data)
      .catch((error) =>
        this.logger.error('Erro Ao Enviar Notificação: ' + error),
      );
  }
}
