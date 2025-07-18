/*
  Warnings:

  - You are about to drop the `cv_detail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cvd_skill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `uploaded_file` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ai_summarization" DROP CONSTRAINT "ai_summarization_cvd_id_fkey";

-- DropForeignKey
ALTER TABLE "cv_detail" DROP CONSTRAINT "cv_detail_file_id_fkey";

-- DropForeignKey
ALTER TABLE "cvd_skill" DROP CONSTRAINT "cvd_skill_cvd_id_fkey";

-- DropForeignKey
ALTER TABLE "uploaded_file" DROP CONSTRAINT "uploaded_file_user_id_fkey";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "cv_detail";

-- DropTable
DROP TABLE "cvd_skill";

-- DropTable
DROP TABLE "uploaded_file";

-- CreateTable
CREATE TABLE "cv_file" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "object_key" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cv_file_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cv_file" ADD CONSTRAINT "cv_file_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
