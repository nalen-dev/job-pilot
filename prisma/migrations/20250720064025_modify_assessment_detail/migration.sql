/*
  Warnings:

  - You are about to drop the column `time_to_master` on the `user_gap_skill` table. All the data in the column will be lost.
  - You are about to drop the `assessment_detail` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `created_at` to the `user_gap_skill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `user_gap_skill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `user_gap_skill` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "assessment_detail" DROP CONSTRAINT "assessment_detail_ugs_id_fkey";

-- DropForeignKey
ALTER TABLE "assessment_question" DROP CONSTRAINT "assessment_question_asd_id_fkey";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "password" DROP NOT NULL;

-- AlterTable
ALTER TABLE "user_gap_skill" DROP COLUMN "time_to_master",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "assessment_detail";

-- AddForeignKey
ALTER TABLE "assessment_question" ADD CONSTRAINT "assessment_question_asd_id_fkey" FOREIGN KEY ("asd_id") REFERENCES "user_gap_skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
