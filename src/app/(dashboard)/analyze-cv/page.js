import { getCVByUserId } from "@/services/cv";
import { FormAnalyze } from "./_components/form-analyze";
import { FormDelete } from "./_components/form-delete";
import { prisma } from "@/utils/prisma";
import { getCurrentSession } from "@/services/auth";
import Link from "next/link";

export default async function Page() {
    const session = await getCurrentSession();
    const files = await getCVByUserId();

    const summaries = await prisma.aiSummarization.findMany({
        where: {
            userId: session.user.id,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return (
        <main>
            <FormAnalyze files={files} />
            <section className="max-w-4xl mx-auto my-12 px-4">
                <h1 className="text-3xl font-bold mb-5">🤖 My CV Analyses</h1>
                <p className="text-sm text-muted-foreground italic pl-1 py-4">
                    Please refresh the page to see the analysis result.
                </p>

                {summaries.length === 0 ? (
                    <p className="text-gray-500 text-sm">
                        You have not analyzed any CVs yet.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {summaries.map((summary) => {
                            if (summary.status === "completed") {
                                return <div key={summary.id} className="space-y-2">
                                    <Link
                                        href={`/analyze-cv/${summary.id}`}
                                        className="block border rounded-lg shadow-sm hover:shadow-md transition p-5 bg-white space-y-2"
                                    >
                                        <div className="font-semibold text-green-500">COMPLETED</div>
                                        <div className="flex items-center justify-between">
                                            <h2 className="font-semibold text-lg text-cv-primary">
                                                {summary.jobTitle || "Untitled Job"}
                                            </h2>
                                        </div>
                                        <p className="text-gray-600 text-sm line-clamp-2">
                                            {summary.jobDesc}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            Created at {new Date(summary.createdAt).toLocaleString()}
                                        </p>
                                    </Link>
                                    <FormDelete id={summary.id}/>
                                </div>
                            }
                            return (
                                <div key={summary.id} className="space-y-2">
                                <div  className="block border rounded-lg shadow-sm hover:shadow-md transition p-5 bg-white space-y-2">
                                    <div className="font-semibold text-yellow-500">PROCESSING</div>
                                    <div className="flex items-center justify-between">
                                        <h2 className="font-semibold text-lg text-cv-primary">
                                            {summary.jobTitle || "Untitled Job"}
                                        </h2>
                                    </div>
                                    <p className="text-gray-600 text-sm line-clamp-2">
                                        {summary.jobDesc}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        Created at {new Date(summary.createdAt).toLocaleString("en-US")}
                                    </p>
                                </div>
                                    <FormDelete id={summary.id}/>
                                    </div>
                            )
                        })}
                    </div>
                )}
            </section>
        </main >
    )
}
