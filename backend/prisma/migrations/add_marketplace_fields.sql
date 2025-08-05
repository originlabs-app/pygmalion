-- Migration pour ajouter les champs marketplace complets

-- 1. Métriques d'engagement pour Course
ALTER TABLE "Course" 
ADD COLUMN IF NOT EXISTS "view_count" INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS "favorite_count" INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS "completion_time_avg" INTEGER,
ADD COLUMN IF NOT EXISTS "last_session_date" TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS "next_session_date" TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS "click_count" INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS "conversion_rate" DECIMAL(5,2);

-- 2. Informations enrichies (JSON)
ALTER TABLE "Course"
ADD COLUMN IF NOT EXISTS "prerequisites_structured" JSONB,
ADD COLUMN IF NOT EXISTS "learning_outcomes" JSONB,
ADD COLUMN IF NOT EXISTS "included_materials" JSONB,
ADD COLUMN IF NOT EXISTS "schedule_details" JSONB,
ADD COLUMN IF NOT EXISTS "instructor_profiles" JSONB,
ADD COLUMN IF NOT EXISTS "faq" JSONB,
ADD COLUMN IF NOT EXISTS "skills_acquired" JSONB;

-- 3. Données commerciales
ALTER TABLE "Course"
ADD COLUMN IF NOT EXISTS "early_bird_discount" DECIMAL(5,2),
ADD COLUMN IF NOT EXISTS "group_discount" JSONB,
ADD COLUMN IF NOT EXISTS "payment_options" TEXT[],
ADD COLUMN IF NOT EXISTS "refund_policy" TEXT,
ADD COLUMN IF NOT EXISTS "min_participants" INTEGER DEFAULT 1,
ADD COLUMN IF NOT EXISTS "max_participants" INTEGER;

-- 4. Géolocalisation et accessibilité
ALTER TABLE "Course"
ADD COLUMN IF NOT EXISTS "location_coordinates" JSONB,
ADD COLUMN IF NOT EXISTS "online_platform" TEXT,
ADD COLUMN IF NOT EXISTS "timezone" TEXT DEFAULT 'Europe/Paris',
ADD COLUMN IF NOT EXISTS "accessibility_info" JSONB,
ADD COLUMN IF NOT EXISTS "transport_info" JSONB;

-- 5. SEO et Marketing
ALTER TABLE "Course"
ADD COLUMN IF NOT EXISTS "meta_title" TEXT,
ADD COLUMN IF NOT EXISTS "meta_description" TEXT,
ADD COLUMN IF NOT EXISTS "slug" TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS "keywords" TEXT[],
ADD COLUMN IF NOT EXISTS "promotional_video_url" TEXT;

-- 6. Tags et catégorisation avancée
ALTER TABLE "Course"
ADD COLUMN IF NOT EXISTS "tags" TEXT[],
ADD COLUMN IF NOT EXISTS "difficulty_level" TEXT CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced', 'expert')),
ADD COLUMN IF NOT EXISTS "industry_sectors" TEXT[],
ADD COLUMN IF NOT EXISTS "job_roles" TEXT[];

-- Table pour tracking des vues
CREATE TABLE IF NOT EXISTS "CourseView" (
    "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    "course_id" UUID NOT NULL REFERENCES "Course"("id"),
    "user_id" UUID,
    "ip_address" TEXT,
    "user_agent" TEXT,
    "referer" TEXT,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("user_id") REFERENCES "UserProfile"("id")
);

-- Table pour les favoris
CREATE TABLE IF NOT EXISTS "CourseFavorite" (
    "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    "course_id" UUID NOT NULL REFERENCES "Course"("id"),
    "user_id" UUID NOT NULL REFERENCES "UserProfile"("id"),
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE("course_id", "user_id")
);

-- Table pour les clics
CREATE TABLE IF NOT EXISTS "CourseClick" (
    "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    "course_id" UUID NOT NULL REFERENCES "Course"("id"),
    "user_id" UUID,
    "click_type" TEXT NOT NULL, -- 'view_details', 'enroll', 'download_pdf', etc.
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table pour les questions/réponses
CREATE TABLE IF NOT EXISTS "CourseQuestion" (
    "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    "course_id" UUID NOT NULL REFERENCES "Course"("id"),
    "user_id" UUID NOT NULL REFERENCES "UserProfile"("id"),
    "question" TEXT NOT NULL,
    "answer" TEXT,
    "answered_by" UUID,
    "is_public" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "answered_at" TIMESTAMP WITH TIME ZONE
);

-- Index pour performance
CREATE INDEX IF NOT EXISTS idx_course_view_count ON "Course"("view_count");
CREATE INDEX IF NOT EXISTS idx_course_favorite_count ON "Course"("favorite_count");
CREATE INDEX IF NOT EXISTS idx_course_slug ON "Course"("slug");
CREATE INDEX IF NOT EXISTS idx_course_next_session ON "Course"("next_session_date");
CREATE INDEX IF NOT EXISTS idx_course_tags ON "Course" USING GIN("tags");
CREATE INDEX IF NOT EXISTS idx_course_keywords ON "Course" USING GIN("keywords");

-- Trigger pour mettre à jour next_session_date automatiquement
CREATE OR REPLACE FUNCTION update_next_session_date()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE "Course" 
    SET "next_session_date" = (
        SELECT MIN("start_date") 
        FROM "Session" 
        WHERE "course_id" = NEW."course_id" 
        AND "start_date" > NOW()
    )
    WHERE "id" = NEW."course_id";
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_next_session
AFTER INSERT OR UPDATE OR DELETE ON "Session"
FOR EACH ROW EXECUTE FUNCTION update_next_session_date();