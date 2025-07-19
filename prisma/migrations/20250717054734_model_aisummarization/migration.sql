/*
  Warnings:

  - The primary key for the `ai_summarization` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cvd_id` on the `ai_summarization` table. All the data in the column will be lost.
  - You are about to drop the column `job_link` on the `ai_summarization` table. All the data in the column will be lost.
  - Added the required column `job_desc` to the `ai_summarization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `match_score` to the `ai_summarization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `ai_summarization` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cv_file" DROP CONSTRAINT "cv_file_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_gap_skill" DROP CONSTRAINT "user_gap_skill_ais_id_fkey";

-- AlterTable
ALTER TABLE "ai_summarization" DROP CONSTRAINT "ai_summarization_pkey",
DROP COLUMN "cvd_id",
DROP COLUMN "job_link",
ADD COLUMN     "cv_id" TEXT,
ADD COLUMN     "job_desc" TEXT NOT NULL,
ADD COLUMN     "match_score" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "skill_match" TEXT[],
ADD COLUMN     "skill_mismatch" TEXT[],
ADD COLUMN     "user_id" TEXT NOT NULL,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "ai_summarization_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "user_gap_skill" ALTER COLUMN "ais_id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "cv_file" ADD CONSTRAINT "cv_file_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_summarization" ADD CONSTRAINT "ai_summarization_cv_id_fkey" FOREIGN KEY ("cv_id") REFERENCES "cv_file"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_summarization" ADD CONSTRAINT "ai_summarization_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_gap_skill" ADD CONSTRAINT "user_gap_skill_ais_id_fkey" FOREIGN KEY ("ais_id") REFERENCES "ai_summarization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
