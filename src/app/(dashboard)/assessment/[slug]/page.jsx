import { Button } from "@/components/ui/button";
import { GetAssementInformation } from "@/services/assessment";
import Link from "next/link";
import React from "react";

export default async function Assessment({ params }) {
  const { slug } = await params;
  const { questionTitle, questions } = await GetAssementInformation(slug);
  console.log(questionTitle, questions);

  return (
    <section>
      <section className=" flex flex-col gap-2 text-center mt-64 items-center">
        <h2 className="font-semibold text-xl">{questionTitle} Assessment</h2>
        <h3>5 Question</h3>
        <Link href={`/assessment/${slug}/${questions.id}`}>
          <Button className="bg-cv-primary hover:bg-cv-primary/80 rounded cursor-pointer w-fit">
            Start Assessment
          </Button>
        </Link>
      </section>
    </section>
  );
}
