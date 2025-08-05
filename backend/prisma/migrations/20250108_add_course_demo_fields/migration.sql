-- AlterTable - Ajouter les champs manquants pour les données de démo
ALTER TABLE "Course" ADD COLUMN IF NOT EXISTS "language" TEXT;
ALTER TABLE "Course" ADD COLUMN IF NOT EXISTS "classification_number" TEXT;
ALTER TABLE "Course" ADD COLUMN IF NOT EXISTS "success_rate" DECIMAL(5,2);
ALTER TABLE "Course" ADD COLUMN IF NOT EXISTS "satisfaction_rate" DECIMAL(3,1);
ALTER TABLE "Course" ADD COLUMN IF NOT EXISTS "validity_duration" TEXT;
ALTER TABLE "Course" ADD COLUMN IF NOT EXISTS "target_certification" TEXT;
ALTER TABLE "Course" ADD COLUMN IF NOT EXISTS "program_pdf_url" TEXT;
ALTER TABLE "Course" ADD COLUMN IF NOT EXISTS "duration" TEXT;
ALTER TABLE "Course" ADD COLUMN IF NOT EXISTS "cpf_eligible" BOOLEAN DEFAULT false;
ALTER TABLE "Course" ADD COLUMN IF NOT EXISTS "opco_eligible" BOOLEAN DEFAULT false;