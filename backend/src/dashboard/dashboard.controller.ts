import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { CurrentUser } from '@/common/decorators/current-user.decorator';

@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('manager-kpis')
  async getManagerKPIs(@CurrentUser() user: any) {
    return this.dashboardService.getManagerKPIs(user.id);
  }

  @Get('training-org-kpis')
  async getTrainingOrgKPIs(@CurrentUser() user: any) {
    return this.dashboardService.getTrainingOrgKPIs(user.id);
  }

  @Get('learner-kpis')
  async getLearnerKPIs(@CurrentUser() user: any) {
    return this.dashboardService.getLearnerKPIs(user.id);
  }
}
