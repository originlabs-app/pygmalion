-- Migration safe pour préserver les données existantes
-- CreateEnum
CREATE TYPE "ModuleType" AS ENUM ('lesson', 'quiz', 'assignment', 'practical', 'exam');

-- CreateEnum
CREATE TYPE "ResourceType" AS ENUM ('video', 'document', 'audio', 'image', 'link', 'scorm');

-- D'abord, renommer la colonne existante
ALTER TABLE "EnrollmentProgress" RENAME COLUMN "module_id" TO "old_module_id";

-- Ajouter la nouvelle colonne UUID nullable temporairement
ALTER TABLE "EnrollmentProgress" ADD COLUMN "module_id" UUID;

-- CreateTable
CREATE TABLE "CourseModule" (
    "id" UUID NOT NULL,
    "course_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "order_index" INTEGER NOT NULL,
    "duration_minutes" INTEGER,
    "module_type" "ModuleType" NOT NULL DEFAULT 'lesson',
    "is_mandatory" BOOLEAN NOT NULL DEFAULT true,
    "passing_score" DECIMAL(5,2),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CourseModule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseResource" (
    "id" UUID NOT NULL,
    "module_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "resource_type" "ResourceType" NOT NULL,
    "file_url" TEXT,
    "external_url" TEXT,
    "mime_type" TEXT,
    "file_size" INTEGER,
    "duration" INTEGER,
    "order_index" INTEGER NOT NULL,
    "is_downloadable" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CourseResource_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CourseModule_course_id_idx" ON "CourseModule"("course_id");

-- CreateIndex
CREATE INDEX "CourseModule_course_id_order_index_idx" ON "CourseModule"("course_id", "order_index");

-- CreateIndex
CREATE INDEX "CourseResource_module_id_idx" ON "CourseResource"("module_id");

-- CreateIndex
CREATE INDEX "CourseResource_module_id_order_index_idx" ON "CourseResource"("module_id", "order_index");

-- Note: La contrainte unique sera recréée automatiquement par Prisma après migration

-- AddForeignKey pour les nouvelles tables
ALTER TABLE "CourseModule" ADD CONSTRAINT "CourseModule_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "CourseResource" ADD CONSTRAINT "CourseResource_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "CourseModule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Créer des modules par défaut pour les cours existants et migrer les données
DO $$
DECLARE
    course_record RECORD;
    module_uuid UUID;
BEGIN
    -- Pour chaque cours existant, créer des modules par défaut
    FOR course_record IN SELECT id, title FROM "Course" LOOP
        -- Module 1: Introduction
        INSERT INTO "CourseModule" (id, course_id, title, description, order_index, module_type)
        VALUES (gen_random_uuid(), course_record.id, 'Introduction', 'Module d''introduction', 1, 'lesson')
        RETURNING id INTO module_uuid;
        
        -- Mettre à jour les EnrollmentProgress avec old_module_id = 'module-1'
        UPDATE "EnrollmentProgress" 
        SET module_id = module_uuid 
        WHERE old_module_id = 'module-1' 
        AND enrollment_id IN (
            SELECT id FROM "Enrollment" WHERE course_id = course_record.id
        );
        
        -- Module 2: Contenu principal
        INSERT INTO "CourseModule" (id, course_id, title, description, order_index, module_type)
        VALUES (gen_random_uuid(), course_record.id, 'Contenu principal', 'Module de contenu principal', 2, 'lesson')
        RETURNING id INTO module_uuid;
        
        UPDATE "EnrollmentProgress" 
        SET module_id = module_uuid 
        WHERE old_module_id = 'module-2'
        AND enrollment_id IN (
            SELECT id FROM "Enrollment" WHERE course_id = course_record.id
        );
        
        -- Module 3: Évaluation
        INSERT INTO "CourseModule" (id, course_id, title, description, order_index, module_type)
        VALUES (gen_random_uuid(), course_record.id, 'Évaluation', 'Module d''évaluation', 3, 'quiz')
        RETURNING id INTO module_uuid;
        
        UPDATE "EnrollmentProgress" 
        SET module_id = module_uuid 
        WHERE old_module_id = 'module-3'
        AND enrollment_id IN (
            SELECT id FROM "Enrollment" WHERE course_id = course_record.id
        );
    END LOOP;
END $$;

-- Supprimer les EnrollmentProgress qui n'ont pas pu être migrés (orphelins)
DELETE FROM "EnrollmentProgress" WHERE module_id IS NULL;

-- Maintenant rendre la colonne NOT NULL et ajouter la contrainte
ALTER TABLE "EnrollmentProgress" ALTER COLUMN "module_id" SET NOT NULL;
ALTER TABLE "EnrollmentProgress" ADD CONSTRAINT "EnrollmentProgress_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "CourseModule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Supprimer l'ancienne colonne
ALTER TABLE "EnrollmentProgress" DROP COLUMN "old_module_id";
