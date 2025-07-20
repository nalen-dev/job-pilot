import React from "react";
import Card from "./_components/card";
import { GetUserAssesments } from "./action";
import Link from "next/link";

async function page() {
  const assessments = await GetUserAssesments();

  return (
    <section>
      {assessments.length > 0 ? (
        <>
          {assessments.map((assm, i) => {
            return (
              <div key={i}>
                <h1 className="mt-5 text-xl font-semibold">{assm.jobTitle}</h1>
                {assm.totalSkills > 0 ? (
                  <div className="mt-5 flex gap-5 flex-wrap">
                    {assm.skills.map((skill, i) => (
                      <Card
                        name={skill.name}
                        status={skill.status}
                        id={skill.id}
                        key={i}
                      />
                    ))}
                  </div>
                ) : (
                  <h3 className="w-full mt-3 text-gray-500">
                    You don't have any assessment yet, find your missing pieces
                    first!
                  </h3>
                )}
              </div>
            );
          })}
        </>
      ) : (
        <h3 className="w-full mt-80 flex justify-center text-gray-500">
          You don't have any assessment yet, find your missing pieces first!
        </h3>
      )}
    </section>
  );
}

export default page;
