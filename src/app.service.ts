import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const envVar = process.env.MY_ENV;
    return `Hello World! This is my envVar: ${envVar}`;
  }
}
