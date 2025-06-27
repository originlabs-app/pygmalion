/*
  Warnings:

  - You are about to drop the column `name` on the `UserProfile` table. All the data in the column will be lost.
  - Added the required column `first_name` to the `UserProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `UserProfile` table without a default value. This is not possible if the table is not empty.

*/

-- Étape 1: Ajouter les nouvelles colonnes avec des valeurs par défaut temporaires
ALTER TABLE "UserProfile" 
ADD COLUMN "first_name" TEXT DEFAULT '',
ADD COLUMN "last_name" TEXT DEFAULT '';

-- Étape 2: Migrer les données existantes
-- Pour chaque utilisateur, on split le name sur le premier espace
UPDATE "UserProfile" 
SET 
  "first_name" = CASE 
    WHEN position(' ' in "name") > 0 THEN trim(substring("name" from 1 for position(' ' in "name") - 1))
    ELSE "name"
  END,
  "last_name" = CASE 
    WHEN position(' ' in "name") > 0 THEN trim(substring("name" from position(' ' in "name") + 1))
    ELSE ''
  END
WHERE "name" IS NOT NULL;

-- Étape 3: Gérer les cas où last_name est vide (nom simple)
UPDATE "UserProfile" 
SET "last_name" = "first_name"
WHERE "last_name" = '';

-- Étape 4: Rendre les colonnes NOT NULL et supprimer les valeurs par défaut
ALTER TABLE "UserProfile" 
ALTER COLUMN "first_name" SET NOT NULL,
ALTER COLUMN "first_name" DROP DEFAULT,
ALTER COLUMN "last_name" SET NOT NULL,
ALTER COLUMN "last_name" DROP DEFAULT;

-- Étape 5: Supprimer l'ancienne colonne name
ALTER TABLE "UserProfile" DROP COLUMN "name";
