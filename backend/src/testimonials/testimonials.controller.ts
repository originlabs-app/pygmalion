import { Controller, Get, Query } from '@nestjs/common';
import { TestimonialsService } from './testimonials.service';

@Controller('testimonials')
export class TestimonialsController {
  constructor(private readonly testimonialsService: TestimonialsService) {}

  @Get()
  async getTestimonials(
    @Query('featured') featured?: string,
    @Query('limit') limit?: string,
  ) {
    return this.testimonialsService.getTestimonials({
      featured: featured === 'true',
      limit: limit ? parseInt(limit, 10) : undefined,
    });
  }

  @Get('random')
  async getRandomTestimonials(@Query('limit') limit?: string) {
    return this.testimonialsService.getRandomTestimonials(
      limit ? parseInt(limit, 10) : 3,
    );
  }
}
