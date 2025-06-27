-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('student', 'training_org', 'manager', 'airport_manager', 'admin');

-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('pending', 'verified', 'rejected', 'expired');

-- CreateEnum
CREATE TYPE "AviationCategory" AS ENUM ('safety', 'security', 'operations', 'maintenance', 'ground_handling', 'cabin_crew', 'pilot_training');

-- CreateEnum
CREATE TYPE "CourseModality" AS ENUM ('in_person', 'online', 'virtual', 'blended');

-- CreateEnum
CREATE TYPE "CourseStatus" AS ENUM ('draft', 'published', 'archived', 'suspended');

-- CreateEnum
CREATE TYPE "SessionType" AS ENUM ('regular', 'private');

-- CreateEnum
CREATE TYPE "EnrollmentStatus" AS ENUM ('pending', 'approved', 'completed', 'cancelled', 'failed');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('pending', 'paid', 'refunded', 'failed');

-- CreateEnum
CREATE TYPE "CertificateStatus" AS ENUM ('valid', 'expiring', 'expired', 'revoked');

-- CreateEnum
CREATE TYPE "AlertType" AS ENUM ('expiring_soon', 'expired', 'renewal_required', 'compliance_issue');

-- CreateEnum
CREATE TYPE "AlertSeverity" AS ENUM ('low', 'medium', 'high', 'critical');

-- CreateEnum
CREATE TYPE "AlertStatus" AS ENUM ('active', 'acknowledged', 'resolved', 'dismissed');

-- CreateTable
CREATE TABLE "UserProfile" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "organization" TEXT,
    "phone" TEXT,
    "kyc_status" "VerificationStatus" NOT NULL DEFAULT 'pending',
    "kyc_verified_at" TIMESTAMPTZ,
    "affiliated_to" UUID[],
    "mfa_enabled" BOOLEAN NOT NULL DEFAULT false,
    "mfa_secret" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingOrganization" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "organization_name" TEXT NOT NULL,
    "siret" TEXT,
    "description" TEXT,
    "website" TEXT,
    "contact_email" TEXT,
    "contact_phone" TEXT,
    "contact_name" TEXT,
    "logo_url" TEXT,
    "verification_status" "VerificationStatus" NOT NULL DEFAULT 'pending',
    "verified_at" TIMESTAMPTZ,
    "qualiopi_certified" BOOLEAN NOT NULL DEFAULT false,
    "qualiopi_number" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TrainingOrganization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "siret" TEXT,
    "contact_email" TEXT,
    "contact_phone" TEXT,
    "manager_id" UUID,
    "airport_id" UUID,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Airport" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "iata_code" TEXT,
    "icao_code" TEXT,
    "city" TEXT,
    "country" TEXT NOT NULL DEFAULT 'France',
    "manager_id" UUID,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Airport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "provider_id" UUID NOT NULL,
    "description" TEXT,
    "category" "AviationCategory" NOT NULL,
    "objectives" TEXT,
    "requirements" TEXT,
    "target_audience" TEXT,
    "program" TEXT,
    "qualiopi_indicators" TEXT[],
    "course_type" "CourseModality" NOT NULL,
    "image_url" TEXT,
    "status" "CourseStatus" NOT NULL DEFAULT 'draft',
    "duration_hours" INTEGER,
    "certification_type" TEXT,
    "certification_validity_months" INTEGER,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" UUID NOT NULL,
    "course_id" UUID NOT NULL,
    "start_date" TIMESTAMPTZ NOT NULL,
    "end_date" TIMESTAMPTZ NOT NULL,
    "location" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "available_seats" INTEGER NOT NULL DEFAULT 0,
    "max_seats" INTEGER NOT NULL DEFAULT 0,
    "lms_course_id" TEXT,
    "virtual_meeting_url" TEXT,
    "virtual_meeting_password" TEXT,
    "session_type" "SessionType" NOT NULL DEFAULT 'regular',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Enrollment" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "course_id" UUID NOT NULL,
    "session_id" UUID NOT NULL,
    "status" "EnrollmentStatus" NOT NULL DEFAULT 'pending',
    "payment_status" "PaymentStatus" NOT NULL DEFAULT 'pending',
    "enrollment_date" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completion_date" TIMESTAMPTZ,
    "score" DECIMAL(5,2),
    "assigned_by" UUID,
    "company_id" UUID,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Enrollment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EnrollmentProgress" (
    "id" UUID NOT NULL,
    "enrollment_id" UUID NOT NULL,
    "module_id" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "completion_date" TIMESTAMPTZ,
    "time_spent_minutes" INTEGER NOT NULL DEFAULT 0,
    "score" DECIMAL(5,2),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EnrollmentProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certificate" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "course_id" UUID NOT NULL,
    "enrollment_id" UUID NOT NULL,
    "certificate_number" TEXT NOT NULL,
    "course_name" TEXT NOT NULL,
    "category" "AviationCategory" NOT NULL,
    "issue_date" DATE NOT NULL,
    "expiry_date" DATE,
    "status" "CertificateStatus" NOT NULL DEFAULT 'valid',
    "token_id" TEXT,
    "blockchain_hash" TEXT,
    "pdf_url" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Certificate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComplianceAlert" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "certificate_id" UUID NOT NULL,
    "alert_type" "AlertType" NOT NULL,
    "message" TEXT NOT NULL,
    "severity" "AlertSeverity" NOT NULL DEFAULT 'medium',
    "status" "AlertStatus" NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolved_at" TIMESTAMPTZ,

    CONSTRAINT "ComplianceAlert_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCompanyAffiliation" (
    "user_id" UUID NOT NULL,
    "company_id" UUID NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'employee',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserCompanyAffiliation_pkey" PRIMARY KEY ("user_id","company_id")
);

-- CreateTable
CREATE TABLE "CoursePrerequisite" (
    "course_id" UUID NOT NULL,
    "prerequisite_course_id" UUID NOT NULL,

    CONSTRAINT "CoursePrerequisite_pkey" PRIMARY KEY ("course_id","prerequisite_course_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_email_key" ON "UserProfile"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TrainingOrganization_siret_key" ON "TrainingOrganization"("siret");

-- CreateIndex
CREATE UNIQUE INDEX "Company_siret_key" ON "Company"("siret");

-- CreateIndex
CREATE UNIQUE INDEX "Airport_iata_code_key" ON "Airport"("iata_code");

-- CreateIndex
CREATE UNIQUE INDEX "Airport_icao_code_key" ON "Airport"("icao_code");

-- CreateIndex
CREATE UNIQUE INDEX "EnrollmentProgress_enrollment_id_module_id_key" ON "EnrollmentProgress"("enrollment_id", "module_id");

-- CreateIndex
CREATE UNIQUE INDEX "Certificate_enrollment_id_key" ON "Certificate"("enrollment_id");

-- CreateIndex
CREATE UNIQUE INDEX "Certificate_certificate_number_key" ON "Certificate"("certificate_number");

-- CreateIndex
CREATE UNIQUE INDEX "Certificate_token_id_key" ON "Certificate"("token_id");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "TrainingOrganization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnrollmentProgress" ADD CONSTRAINT "EnrollmentProgress_enrollment_id_fkey" FOREIGN KEY ("enrollment_id") REFERENCES "Enrollment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_enrollment_id_fkey" FOREIGN KEY ("enrollment_id") REFERENCES "Enrollment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComplianceAlert" ADD CONSTRAINT "ComplianceAlert_certificate_id_fkey" FOREIGN KEY ("certificate_id") REFERENCES "Certificate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCompanyAffiliation" ADD CONSTRAINT "UserCompanyAffiliation_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoursePrerequisite" ADD CONSTRAINT "CoursePrerequisite_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoursePrerequisite" ADD CONSTRAINT "CoursePrerequisite_prerequisite_course_id_fkey" FOREIGN KEY ("prerequisite_course_id") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
