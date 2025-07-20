/*
  Warnings:

  - The primary key for the `assessment_question` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `asd_id` on the `assessment_question` table. All the data in the column will be lost.
  - The primary key for the `user_gap_skill` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `ugs_id` to the `assessment_question` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "assessment_question" DROP CONSTRAINT "assessment_question_asd_id_fkey";

-- AlterTable
ALTER TABLE "assessment_question" DROP CONSTRAINT "assessment_question_pkey",
DROP COLUMN "asd_id",
ADD COLUMN     "ugs_id" TEXT NOT NULL,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "assessment_question_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "user_gap_skill" DROP CONSTRAINT "user_gap_skill_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "user_gap_skill_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "assessment_question" ADD CONSTRAINT "assessment_question_ugs_id_fkey" FOREIGN KEY ("ugs_id") REFERENCES "user_gap_skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
