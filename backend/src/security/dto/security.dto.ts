import {
  IsString,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsEnum,
  IsUUID,
  Min,
  Max,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateExamConfigDto {
  @IsUUID()
  exam_id: string;

  @IsBoolean()
  @IsOptional()
  default_proctoring?: boolean = false;

  @IsBoolean()
  @IsOptional()
  default_webcam?: boolean = false;

  @IsBoolean()
  @IsOptional()
  default_lockdown?: boolean = false;

  @IsString()
  @IsOptional()
  default_ip_restriction?: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  @IsOptional()
  allowed_attempts?: number = 1;

  @IsBoolean()
  @IsOptional()
  time_limit_strict?: boolean = true;

  @IsBoolean()
  @IsOptional()
  question_randomization?: boolean = true;

  @IsBoolean()
  @IsOptional()
  answer_randomization?: boolean = true;

  @IsNumber()
  @Min(1)
  @Max(10)
  @IsOptional()
  alert_threshold?: number = 3;

  @IsBoolean()
  @IsOptional()
  auto_suspend?: boolean = false;

  @IsBoolean()
  @IsOptional()
  manual_review_required?: boolean = true;
}

export class UpdateExamConfigDto {
  @IsBoolean()
  @IsOptional()
  default_proctoring?: boolean;

  @IsBoolean()
  @IsOptional()
  default_webcam?: boolean;

  @IsBoolean()
  @IsOptional()
  default_lockdown?: boolean;

  @IsString()
  @IsOptional()
  default_ip_restriction?: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  @IsOptional()
  allowed_attempts?: number;

  @IsBoolean()
  @IsOptional()
  time_limit_strict?: boolean;

  @IsBoolean()
  @IsOptional()
  question_randomization?: boolean;

  @IsBoolean()
  @IsOptional()
  answer_randomization?: boolean;

  @IsNumber()
  @Min(1)
  @Max(10)
  @IsOptional()
  alert_threshold?: number;

  @IsBoolean()
  @IsOptional()
  auto_suspend?: boolean;

  @IsBoolean()
  @IsOptional()
  manual_review_required?: boolean;
}

export class SecurityEventFilterDto {
  @IsNumber()
  @Min(1)
  @Max(100)
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  limit?: number = 20;

  @IsNumber()
  @Min(0)
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  offset?: number = 0;

  @IsEnum(['low', 'medium', 'high'])
  @IsOptional()
  severity?: 'low' | 'medium' | 'high';

  @IsString()
  @IsOptional()
  event_type?: string;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  resolved?: boolean;

  @IsUUID()
  @IsOptional()
  exam_id?: string;

  @IsUUID()
  @IsOptional()
  exam_session_id?: string;

  @IsString()
  @IsOptional()
  date_from?: string;

  @IsString()
  @IsOptional()
  date_to?: string;
}

export class ExamReportFilterDto {
  @IsEnum(['week', 'month', 'quarter', 'year'])
  @IsOptional()
  period?: 'week' | 'month' | 'quarter' | 'year' = 'month';

  @IsUUID()
  @IsOptional()
  courseId?: string;

  @IsEnum(['passed', 'failed', 'suspended', 'under_review'])
  @IsOptional()
  status?: 'passed' | 'failed' | 'suspended' | 'under_review';

  @IsEnum(['low', 'medium', 'high'])
  @IsOptional()
  risk_level?: 'low' | 'medium' | 'high';

  @IsString()
  @IsOptional()
  date_from?: string;

  @IsString()
  @IsOptional()
  date_to?: string;

  @IsNumber()
  @Min(1)
  @Max(100)
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  limit?: number = 50;

  @IsNumber()
  @Min(0)
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  offset?: number = 0;
}

export class ValidateExamDto {
  @IsUUID()
  attemptId: string;

  @IsEnum(['validate', 'reject'])
  decision: 'validate' | 'reject';

  @IsString()
  @IsOptional()
  comment?: string;
}

export class CreateSecurityEventDto {
  @IsUUID()
  exam_session_id: string;

  @IsEnum([
    // Navigation
    'tab_switch',
    'window_focus_lost',
    'browser_minimize',
    'new_window_opened',
    // Interaction
    'copy_paste_attempt',
    'right_click_blocked',
    'keyboard_shortcut_blocked',
    'screenshot_attempt',
    // Surveillance
    'webcam_blocked',
    'webcam_disconnected',
    'microphone_blocked',
    'multiple_monitors_detected',
    'screen_sharing_detected',
    // Réseau
    'suspicious_network_activity',
    'vpn_detected',
    'location_mismatch',
    'ip_change',
    // Identité
    'identity_verification_failed',
    'face_recognition_mismatch',
    'suspicious_behavior',
    // Technique
    'developer_tools_opened',
    'page_source_accessed',
    'browser_extension_detected',
    'virtual_machine_detected',
  ])
  event_type: string;

  @IsString()
  description: string;

  @IsEnum(['low', 'medium', 'high'])
  @IsOptional()
  severity?: 'low' | 'medium' | 'high' = 'medium';

  @IsOptional()
  metadata?: Record<string, unknown>;
}

export class StartExamSessionDto {
  @IsString()
  @IsOptional()
  client_ip?: string;

  @IsString()
  @IsOptional()
  user_agent?: string;

  @IsString()
  @IsOptional()
  screen_resolution?: string;

  @IsString()
  @IsOptional()
  timezone?: string;

  @IsString()
  @IsOptional()
  webcam_snapshot?: string;
}
