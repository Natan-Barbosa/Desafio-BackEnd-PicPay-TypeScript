import { HttpService } from '@nestjs/axios';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthorizationClient {
  constructor(private readonly httpService: HttpService) {}

  public async isAuthorized() {
    await this.httpService.axiosRef
      .get('https://util.devi.tools/api/v2/authorize')
      .then((data) => data)
      .catch((error) => {
        throw new UnauthorizedException(error);
      });
  }
}
