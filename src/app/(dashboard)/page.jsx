import { getCurrentSession } from "@/services/auth";
import React from "react";
import { redirect } from "next/navigation";
import { GetTotalUserAnalyze, GetTotalUserCvs } from "@/services/cv";

export default async function page() {
  const session = await getCurrentSession();
  if (!session) {
    redirect("/login");
  }

  const totalCv = await GetTotalUserCvs(session.userId);
  const totalAn = await GetTotalUserAnalyze(session.userId);

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold">
          {session
            ? `Welcomeback, ${session.user.name.toUpperCase()}`
            : "Loading..."}
        </h1>
        <p className="text-gray-500">
          Here’s what’s happening with your job applications
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 border rounded-xl">
          <p className="text-gray-500">Total CV Analyzed</p>
          <h2 className="text-3xl font-bold">{totalAn}</h2>
        </div>
        <div className="p-4 border rounded-xl">
          <p className="text-gray-500">Total CV Uploaded</p>
          <h2 className="text-3xl font-bold">{totalCv}</h2>
        </div>
      </div>
    </div>
  );
}
