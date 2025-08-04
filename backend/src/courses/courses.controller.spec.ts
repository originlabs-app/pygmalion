import { Test, TestingModule } from '@nestjs/testing';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { AviationCategory, CourseModality } from '@prisma/client';

describe('CoursesController', () => {
  let controller: CoursesController;
  let service: CoursesService;

  const mockCourse = {
    id: 'test-course-1',
    title: 'Test Course',
    provider_id: 'test-provider-1',
    description: 'Test course description',
    category: 'security',
    course_type: 'online',
    status: 'published',
    duration_hours: 10,
    created_at: new Date(),
    updated_at: new Date(),
    provider: {
      id: 'test-provider-1',
      organization_name: 'Test Organization',
    },
    sessions: [],
    _count: {
      enrollments: 0,
      sessions: 0,
    },
  };

  const mockCoursesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    findByProvider: jest.fn(),
    updateStatus: jest.fn(),
  };

  const mockPrismaService = {
    userProfile: {
      findUnique: jest.fn(),
    },
    trainingOrganization: {
      findFirst: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoursesController],
      providers: [
        {
          provide: CoursesService,
          useValue: mockCoursesService,
        },
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<CoursesController>(CoursesController);
    service = module.get<CoursesService>(CoursesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a course', async () => {
      const createCourseDto = {
        title: 'Test Course',
        provider_id: 'test-provider-1',
        description: 'Test course description',
        category: AviationCategory.security,
        course_type: CourseModality.online,
      };

      const mockRequest = {
        user: { sub: 'user-id', role: 'admin' },
      };

      mockCoursesService.create.mockResolvedValue(mockCourse);

      const result = await controller.create(createCourseDto, mockRequest);

      expect(result).toEqual(mockCourse);
      expect(mockCoursesService.create).toHaveBeenCalledWith(createCourseDto);
    });

    it('should set provider_id for training_org users', async () => {
      const createCourseDto = {
        title: 'Test Course',
        provider_id: 'wrong-provider',
        description: 'Test course description',
        category: AviationCategory.security,
        course_type: CourseModality.online,
      };

      const mockRequest = {
        user: { sub: 'user-id', role: 'training_org' },
      };

      mockPrismaService.trainingOrganization.findFirst.mockResolvedValue({
        id: 'correct-provider-id',
      });

      mockCoursesService.create.mockResolvedValue(mockCourse);

      await controller.create(createCourseDto, mockRequest);

      expect(createCourseDto.provider_id).toBe('correct-provider-id');
      expect(mockCoursesService.create).toHaveBeenCalledWith(createCourseDto);
    });
  });

  describe('findAll', () => {
    it('should return paginated courses', async () => {
      const mockResponse = {
        data: [mockCourse],
        meta: {
          total: 1,
          page: 1,
          limit: 20,
          totalPages: 1,
        },
      };

      mockCoursesService.findAll.mockResolvedValue(mockResponse);

      const result = await controller.findAll({});

      expect(result).toEqual(mockResponse);
      expect(mockCoursesService.findAll).toHaveBeenCalledWith({});
    });
  });

  describe('findOne', () => {
    it('should return a course by id', async () => {
      mockCoursesService.findOne.mockResolvedValue(mockCourse);

      const result = await controller.findOne('test-course-1');

      expect(result).toEqual(mockCourse);
      expect(mockCoursesService.findOne).toHaveBeenCalledWith('test-course-1');
    });
  });

  describe('update', () => {
    it('should update a course', async () => {
      const updateCourseDto = {
        title: 'Updated Course',
      };

      const mockRequest = {
        user: { sub: 'user-id', role: 'admin' },
      };

      mockCoursesService.update.mockResolvedValue({
        ...mockCourse,
        title: 'Updated Course',
      });

      const result = await controller.update('test-course-1', updateCourseDto, mockRequest);

      expect(result.title).toBe('Updated Course');
      expect(mockCoursesService.update).toHaveBeenCalledWith('test-course-1', updateCourseDto);
    });
  });

  describe('remove', () => {
    it('should delete a course', async () => {
      const mockRequest = {
        user: { sub: 'user-id', role: 'admin' },
      };

      mockCoursesService.remove.mockResolvedValue(undefined);

      const result = await controller.remove('test-course-1', mockRequest);

      expect(result).toBeUndefined();
      expect(mockCoursesService.remove).toHaveBeenCalledWith('test-course-1');
    });
  });

  describe('updateStatus', () => {
    it('should update course status', async () => {
      const mockRequest = {
        user: { sub: 'user-id', role: 'admin' },
      };

      mockCoursesService.updateStatus.mockResolvedValue({
        ...mockCourse,
        status: 'archived',
      });

      const result = await controller.updateStatus('test-course-1', 'archived', mockRequest);

      expect(result.status).toBe('archived');
      expect(mockCoursesService.updateStatus).toHaveBeenCalledWith('test-course-1', 'archived');
    });
  });
}); 