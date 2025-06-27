-- CreateEnum
CREATE TYPE "StorageType" AS ENUM ('local', 'youtube', 'vimeo');

-- CreateTable
CREATE TABLE "TrainingOrgDocument" (
    "id" UUID NOT NULL,
    "org_id" UUID NOT NULL,
    "filename" TEXT NOT NULL,
    "mime_type" TEXT NOT NULL,
    "file_size" INTEGER,
    "storage_type" "StorageType" NOT NULL DEFAULT 'local',
    "storage_path" TEXT,
    "external_url" TEXT,
    "thumbnail_url" TEXT,
    "title" TEXT,
    "duration" INTEGER,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TrainingOrgDocument_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TrainingOrgDocument_org_id_idx" ON "TrainingOrgDocument"("org_id");

-- AddForeignKey
ALTER TABLE "TrainingOrgDocument" ADD CONSTRAINT "TrainingOrgDocument_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "TrainingOrganization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
