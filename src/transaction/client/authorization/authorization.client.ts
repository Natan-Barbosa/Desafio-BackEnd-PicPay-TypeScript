import { HttpService } from '@nestjs/axios';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthorizationClient {
  private readonly logger = new Logger(AuthorizationClient.name);

  constructor(private readonly httpService: HttpService) {}

  public async isAuthorized() {
    await this.httpService.axiosRef
      .get('https://util.devi.tools/api/v2/authorize')
      .then((data) => data)
      .catch((error: Error) => {
        this.logger.error(error.message);
        throw new UnauthorizedException(
          'You Are Not Authorized To Realize Transaction',
        );
      });
  }
}
