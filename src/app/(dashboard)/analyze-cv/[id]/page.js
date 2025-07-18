import { prisma } from "@/utils/prisma";
import MarkdownPage from "../_components/markdown";
import Link from "next/link";
import Image from "next/image";

export default async function Page({ params }) {
    const { id } = await params;
    const summary = await prisma.aiSummarization.findUnique({
        where: {
            id,
        },
    });
    return (
        <div>
            <Link href="/analyze-cv" className="mt-6 ml-4 inline-block">
                <Image
                    src="/images/left-arrow.png"
                    alt="back"
                    width={45}
                    height={45}
                />
            </Link>
            <div className="max-w-3xl mx-auto mb-7 px-4">
                <section className="mt-2 space-y-6 bg-white p-6 rounded-xl shadow-sm border">
                    <h2 className="text-2xl font-bold text-cv-primary">
                        🤖 AI Summary Result
                    </h2>

                    <div>
                        <p className="text-lg font-medium">Job Title</p>
                        <p className=" text-gray-600">{summary.jobTitle}</p>
                    </div>

                    <div className="text-center">
                        <p className="font-bold text-gray-600 mb-4">Match Score</p>
                        <div className="inline-block rounded-full bg-cv-primary/10 p-15 py-15 text-4xl font-bold text-cv-primary">
                            {summary.matchScore}/100
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <p className="font-semibold mb-2">✅ Matched Skills</p>
                            <ul className="bg-green-100 text-green-800 p-4 pl-6 rounded-lg list-disc ml-4 space-y-1">
                                {summary.skillMatch.map((skill, i) => (
                                    <li key={i}>{skill}</li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <p className="font-semibold mb-2">❌ Unmatched Skills</p>
                            <ul className="bg-red-100 text-red-800 p-4 pl-6 rounded-lg list-disc ml-4 space-y-1">
                                {summary.skillMismatch.map((skill, i) => (
                                    <li key={i}>{skill}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div>
                        <p className="text-lg font-bold mt-6 mb-2">📄 Summary</p>
                        <div className="prose prose-sm max-w-none">
                            <MarkdownPage summarizeDetail={summary.summarizeDetail} />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
