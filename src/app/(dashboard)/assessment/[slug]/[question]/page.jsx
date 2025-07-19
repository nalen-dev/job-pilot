import React from "react";
import QuestionOption from "../../_components/questionOption";

export default function page() {
  return (
    <section className="mt-20 w-2/3 mx-auto">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-cv-primary">
          JavaScript - Question 1
        </h3>
        <div className=" flex gap-1">
          <div className="bg-cv-primary w-8 h-8 text-white rounded text-center pt-1">
            1
          </div>
          <div className="bg-cv-primary/50 w-8 h-8 text-white rounded text-center pt-1">
            2
          </div>
          <div className="bg-cv-primary/50 w-8 h-8 text-white rounded text-center pt-1">
            3
          </div>
          <div className="bg-cv-primary/50 w-8 h-8 text-white rounded text-center pt-1">
            4
          </div>
          <div className="bg-cv-primary/50 w-8 h-8 text-white rounded text-center pt-1">
            5
          </div>
        </div>
      </div>
      <section className="mt-5 bg-gray-100 w-full h-80 py-10 px-5 flex flex-col justify-between">
        <p className="text-lg ">
          What are the various data types that is not exist in JavaScript?
        </p>
        <QuestionOption />
        <div className="text-cv-primary flex justify-between">
          <p>Before</p>
          <p>Next</p>
        </div>
      </section>
    </section>
  );
}
