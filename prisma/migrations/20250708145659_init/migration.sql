-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "uploaded_file" (
    "id" BIGINT NOT NULL,
    "user_id" TEXT NOT NULL,
    "object_key" TEXT NOT NULL,
    "bucket" TEXT NOT NULL,
    "mime_type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_active" BOOLEAN NOT NULL,

    CONSTRAINT "uploaded_file_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cv_detail" (
    "id" BIGINT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "file_id" BIGINT NOT NULL,
    "cv_extract" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cv_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_summarization" (
    "id" BIGINT NOT NULL,
    "cvd_id" BIGINT NOT NULL,
    "job_title" TEXT NOT NULL,
    "job_link" TEXT NOT NULL,
    "sumarize_detail" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ai_summarization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cvd_skill" (
    "id" BIGINT NOT NULL,
    "cvd_id" BIGINT NOT NULL,
    "skill" TEXT NOT NULL,
    "level" TEXT NOT NULL,

    CONSTRAINT "cvd_skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_gap_skill" (
    "id" BIGINT NOT NULL,
    "ais_id" BIGINT NOT NULL,
    "skill" TEXT NOT NULL,
    "time_to_master" TEXT NOT NULL,

    CONSTRAINT "user_gap_skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assessment_detail" (
    "id" BIGINT NOT NULL,
    "ugs_id" BIGINT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "assessment_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assessment_question" (
    "id" BIGINT NOT NULL,
    "asd_id" BIGINT NOT NULL,
    "question" TEXT NOT NULL,
    "ans_1" TEXT NOT NULL,
    "ans_2" TEXT NOT NULL,
    "ans_3" TEXT NOT NULL,
    "ans_4" TEXT NOT NULL,
    "ans_right" TEXT NOT NULL,
    "ans_user" TEXT NOT NULL,

    CONSTRAINT "assessment_question_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "uploaded_file" ADD CONSTRAINT "uploaded_file_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cv_detail" ADD CONSTRAINT "cv_detail_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "uploaded_file"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_summarization" ADD CONSTRAINT "ai_summarization_cvd_id_fkey" FOREIGN KEY ("cvd_id") REFERENCES "cv_detail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cvd_skill" ADD CONSTRAINT "cvd_skill_cvd_id_fkey" FOREIGN KEY ("cvd_id") REFERENCES "cv_detail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_gap_skill" ADD CONSTRAINT "user_gap_skill_ais_id_fkey" FOREIGN KEY ("ais_id") REFERENCES "ai_summarization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assessment_detail" ADD CONSTRAINT "assessment_detail_ugs_id_fkey" FOREIGN KEY ("ugs_id") REFERENCES "user_gap_skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assessment_question" ADD CONSTRAINT "assessment_question_asd_id_fkey" FOREIGN KEY ("asd_id") REFERENCES "assessment_detail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
