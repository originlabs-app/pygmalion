import { Controller, Get, Post, Options } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  getHealth() {
    return this.appService.getHealthCheck();
  }

  @Options('*')
  handleOptions() {
    return 'OK';
  }

  @Post('test')
  testPost() {
    return { message: 'POST test successful' };
  }
}
