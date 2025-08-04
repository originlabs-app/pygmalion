
import { Test, TestingModule } from '@nestjs/testing';
import { EnrollmentsController } from './enrollments.controller';
import { EnrollmentsService } from './enrollments.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { EnrollmentStatus } from '@prisma/client';

describe('EnrollmentsController', () => {
  let controller: EnrollmentsController;
  let service: EnrollmentsService;

  const mockEnrollment = {
    id: 'test-enrollment-1',
    user_id: 'test-user-1',
    course_id: 'test-course-1',
    session_id: 'test-session-1',
    status: 'approved',
    payment_status: 'paid',
    enrollment_date: new Date(),
    course: {
      id: 'test-course-1',
      title: 'Test Course',
      provider_id: 'test-provider-1',
    },
    session: {
      id: 'test-session-1',
      start_date: new Date(),
      end_date: new Date(),
      price: 100,
    },
  };

  const mockEnrollmentsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    findByUser: jest.fn(),
    updateProgress: jest.fn(),
  };

  const mockPrismaService = {
    trainingOrganization: {
      findFirst: jest.fn(),
    },
    course: {
      findMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnrollmentsController],
      providers: [
        {
          provide: EnrollmentsService,
          useValue: mockEnrollmentsService,
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

    controller = module.get<EnrollmentsController>(EnrollmentsController);
    service = module.get<EnrollmentsService>(EnrollmentsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an enrollment for student', async () => {
      const createEnrollmentDto = {
        user_id: 'test-user-1',
        course_id: 'test-course-1',
        session_id: 'test-session-1',
      };

      const mockRequest = {
        user: { sub: 'test-user-1', role: 'student' },
      };

      mockEnrollmentsService.create.mockResolvedValue(mockEnrollment);

      const result = await controller.create(createEnrollmentDto, mockRequest);

      expect(result).toEqual(mockEnrollment);
      expect(createEnrollmentDto.user_id).toBe('test-user-1');
      expect(mockEnrollmentsService.create).toHaveBeenCalledWith(createEnrollmentDto);
    });

    it('should create an enrollment for manager with assigned_by', async () => {
      const createEnrollmentDto: any = {
        user_id: 'test-user-1',
        course_id: 'test-course-1',
        session_id: 'test-session-1',
      };

      const mockRequest = {
        user: { sub: 'manager-id', role: 'manager' },
      };

      mockEnrollmentsService.create.mockResolvedValue(mockEnrollment);

      const result = await controller.create(createEnrollmentDto, mockRequest);

      expect(result).toEqual(mockEnrollment);
      expect(createEnrollmentDto.assigned_by).toBe('manager-id');
      expect(mockEnrollmentsService.create).toHaveBeenCalledWith(createEnrollmentDto);
    });
  });

  describe('findAll', () => {
    it('should return paginated enrollments', async () => {
      const mockResponse = {
        data: [mockEnrollment],
        meta: {
          total: 1,
          page: 1,
          limit: 20,
          totalPages: 1,
        },
      };

      mockEnrollmentsService.findAll.mockResolvedValue(mockResponse);

      const mockRequest = {
        user: { sub: 'admin-id', role: 'admin' },
      };

      const result = await controller.findAll({}, mockRequest);

      expect(result).toEqual(mockResponse);
      expect(mockEnrollmentsService.findAll).toHaveBeenCalledWith({});
    });
  });

  describe('findOne', () => {
    it('should return an enrollment by id', async () => {
      mockEnrollmentsService.findOne.mockResolvedValue(mockEnrollment);

      const mockRequest = {
        user: { sub: 'test-user-1', role: 'student' },
      };

      const result = await controller.findOne('test-enrollment-1', mockRequest);

      expect(result).toEqual(mockEnrollment);
      expect(mockEnrollmentsService.findOne).toHaveBeenCalledWith('test-enrollment-1');
    });
  });

  describe('update', () => {
    it('should update an enrollment', async () => {
      const updateEnrollmentDto = {
        status: EnrollmentStatus.completed,
      };

      const mockRequest = {
        user: { sub: 'admin-id', role: 'admin' },
      };

      mockEnrollmentsService.update.mockResolvedValue({
        ...mockEnrollment,
        status: 'completed',
      });

      const result = await controller.update('test-enrollment-1', updateEnrollmentDto, mockRequest);

      expect(result.status).toBe('completed');
      expect(mockEnrollmentsService.update).toHaveBeenCalledWith('test-enrollment-1', updateEnrollmentDto);
    });
  });

  describe('updateProgress', () => {
    it('should update enrollment progress', async () => {
      const progressData = {
        completed: true,
        timeSpentMinutes: 60,
        score: 85,
      };

      const mockRequest = {
        user: { sub: 'test-user-1', role: 'student' },
      };

      mockEnrollmentsService.findOne.mockResolvedValue(mockEnrollment);
      mockEnrollmentsService.updateProgress.mockResolvedValue({
        id: 'progress-1',
        enrollment_id: 'test-enrollment-1',
        module_id: 'module-1',
        completed: true,
        time_spent_minutes: 60,
        score: 85,
      });

      const result = await controller.updateProgress(
        'test-enrollment-1',
        'module-1',
        progressData,
        mockRequest
      );

      expect(result.completed).toBe(true);
      expect(mockEnrollmentsService.updateProgress).toHaveBeenCalledWith(
        'test-enrollment-1',
        'module-1',
        progressData
      );
    });
  });

  describe('findMyEnrollments', () => {
    it('should return user enrollments', async () => {
      const mockRequest = {
        user: { sub: 'test-user-1', role: 'student' },
      };

      mockEnrollmentsService.findByUser.mockResolvedValue([mockEnrollment]);

      const result = await controller.findMyEnrollments({}, mockRequest);

      expect(result).toEqual([mockEnrollment]);
      expect(mockEnrollmentsService.findByUser).toHaveBeenCalledWith('test-user-1', {});
    });
  });

  describe('remove', () => {
    it('should delete an enrollment', async () => {
      const mockRequest = {
        user: { sub: 'test-user-1', role: 'student' },
      };

      mockEnrollmentsService.findOne.mockResolvedValue(mockEnrollment);
      mockEnrollmentsService.remove.mockResolvedValue(undefined);

      const result = await controller.remove('test-enrollment-1', mockRequest);

      expect(result).toBeUndefined();
      expect(mockEnrollmentsService.remove).toHaveBeenCalledWith('test-enrollment-1');
    });
  });
}); 