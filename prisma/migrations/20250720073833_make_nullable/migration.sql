-- AlterTable
ALTER TABLE "assessment_question" ALTER COLUMN "ans_user" DROP NOT NULL;

-- AlterTable
ALTER TABLE "user_gap_skill" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
