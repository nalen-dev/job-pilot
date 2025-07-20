import React from "react";
import QuestionOption from "../../_components/questionOption";
import { GetAllAssesmentIds, GetQuestionDetail } from "@/services/assessment";
import Link from "next/link";

export default async function page({ params }) {
  const { slug, question } = await params;
  const questionIds = await GetAllAssesmentIds(slug);
  const questionDetail = await GetQuestionDetail(question);
  console.log(questionDetail);

  return (
    <section className="mt-20 w-2/3 mx-auto">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-cv-primary">JavaScript</h3>
        <div className=" flex gap-1">
          {questionIds.map((question, i) => {
            return (
              <Link href={`/assessment/${slug}/${question.id}`} key={i}>
                {questionDetail.ansUser != null ? (
                  <div className="bg-cv-primary w-8 h-8 text-white rounded text-center pt-1">
                    {`${i + 1}`}
                  </div>
                ) : (
                  <div className="bg-cv-primary/50 w-8 h-8 text-white rounded text-center pt-1">
                    {`${i + 1}`}
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
      <section className="mt-5 bg-gray-100 w-full h-80 py-10 px-5 flex flex-col justify-between">
        <p className="text-lg ">{questionDetail.question}</p>
        <QuestionOption questionDetail={questionDetail} />
        <div className="text-cv-primary flex justify-between">
          <p>Before</p>
          <p>Next</p>
        </div>
      </section>
    </section>
  );
}
