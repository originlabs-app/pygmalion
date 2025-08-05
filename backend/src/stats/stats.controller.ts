import { Controller, Get } from '@nestjs/common';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('global')
  async getGlobalStats() {
    return this.statsService.getGlobalStats();
  }

  @Get('courses')
  async getCoursesStats() {
    return this.statsService.getCoursesStats();
  }
}
