import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class TestimonialsService {
  constructor(private prisma: PrismaService) {}

  async getTestimonials(params: { featured?: boolean; limit?: number }) {
    const { featured, limit = 10 } = params;

    const where = featured !== undefined ? { is_featured: featured } : {};

    return this.prisma.testimonial.findMany({
      where,
      take: limit,
      orderBy: { created_at: 'desc' },
    });
  }

  async getRandomTestimonials(limit = 3) {
    // Get total count
    const count = await this.prisma.testimonial.count();

    // Get random testimonials
    const testimonials = await this.prisma.$queryRaw`
      SELECT * FROM "Testimonial" 
      ORDER BY RANDOM() 
      LIMIT ${limit}
    `;

    return testimonials;
  }
}
