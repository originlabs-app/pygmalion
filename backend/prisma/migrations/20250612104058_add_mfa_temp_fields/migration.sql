-- AlterTable
ALTER TABLE "UserProfile" ADD COLUMN     "mfa_temp_secret" TEXT,
ADD COLUMN     "mfa_temp_secret_expires" TIMESTAMPTZ;
