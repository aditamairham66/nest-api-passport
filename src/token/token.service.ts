import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
  ) {}

  async generateToken(authorizationHeader: string): Promise<string> {
    this.logger.debug(`token ${authorizationHeader}`);

    this.validateBasicAuth(authorizationHeader);

    const username = this.extractUsernameFromBasicAuth(authorizationHeader);
    const payload = {
      access_api: username,
    };

    return this.jwtService.sign(payload);
  }

  async updateToken(authorizationHeader: string): Promise<string> {
    const token = this.extractBearerToken(authorizationHeader);

    // Verifikasi token lama
    const decoded = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });

    // Buat token baru dengan payload yang sama, kecuali waktu kedaluwarsa
    const { ...payload } = decoded; // Hilangkan waktu kedaluwarsa lama dari payload
    const newToken = this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_EXPIRED_TIME,
    });

    return newToken;
  }

  private validateBasicAuth(authorizationHeader: string): void {
    if (!authorizationHeader || !authorizationHeader.startsWith('Basic ')) {
      throw new UnauthorizedException(
        'Authorization header is missing or invalid.',
      );
    }

    const base64Credentials = authorizationHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString(
      'ascii',
    );
    const [username, password] = credentials.split(':');

    const validUsername = process.env.BASIC_AUTH_USERNAME;
    const validPassword = process.env.BASIC_AUTH_PASSWORD;

    if (username !== validUsername || password !== validPassword) {
      throw new UnauthorizedException('Invalid username or password.');
    }
  }

  private extractBearerToken(authorizationHeader: string): string {
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Bearer token is missing or invalid.');
    }
    return authorizationHeader.split(' ')[1];
  }

  private extractUsernameFromBasicAuth(authorizationHeader: string): string {
    const base64Credentials = authorizationHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString(
      'ascii',
    );
    const [username] = credentials.split(':');
    return username;
  }
}
