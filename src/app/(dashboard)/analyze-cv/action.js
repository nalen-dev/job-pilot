"use server";

import { openai } from "@/utils/ai";
import { prisma } from "@/utils/prisma";

export async function analyzeCVAction(_, formData) {
    const selectedFile = formData.get('selectedFile');
    const jobDesc = formData.get('jobDesc');

    if (!selectedFile || !jobDesc) {
        throw new Error("No selectedFile or jobDesc");
    }

    const { fileId, fileUrl } = JSON.parse(selectedFile);
    console.log("Selected file:", fileUrl);

    const res = await fetch(fileUrl);
    if (!res.ok) {
        throw new Error(`Failed to fetch file: ${res.status} ${res.statusText}`);
    }

    const arrayBuffer = await res.arrayBuffer();
    const blob = new Blob([arrayBuffer], { type: res.headers.get("content-type") || "application/pdf" });
    const file = new File([blob], "cv.pdf", { type: blob.type });

    let result;
    try {
        const uploadedFile = await openai.files.create({
            file: file,
            purpose: "user_data"
        });

        const response = await openai.responses.parse({
            model: "gpt-4o-mini",
            input: [
                {
                    role: "user",
                    content: [
                        {
                            type: "input_file",
                            file_id: uploadedFile.id
                        },
                        {
                            type: "input_text",
                            text: `You are a professional resume analyzer. Analyze CV with job description: ${jobDesc}`
                        }
                    ]
                }
            ],
            text: {
                format: {
                    type: "json_schema",
                    name: "analyze_cv",
                    schema: {
                        type: "object",
                        properties: {
                            jobTitle: {
                                type: "string",
                                description: "The title of the job"
                            },
                            matchScore: {
                                type: "number",
                                description: "How well the CV matches the job description (0–100)"
                            },
                            skillMatch: {
                                type: "array",
                                items: { type: "string" },
                                description: "List of skills in the job description that are present in the CV"
                            },
                            skillMismatch: {
                                type: "array",
                                items: { type: "string" },
                                description: "List of missing or mismatched skills in the job description"
                            },
                            analysis: {
                                type: "string",
                                description: "Markdown-formatted the analysis with sections: overview, strengths, gaps, areas for improvement, conclusion"
                            },
                        },
                        required: ["jobTitle", "matchScore", "skillMatch", "skillMismatch", "analysis"],
                        additionalProperties: false,
                    },
                }
            }
        });
        result = response.output_parsed;
    } catch (error) {
        console.log(error);
    }

    await prisma.aiSummarization.create({
        data: {
            jobTitle: result.jobTitle,
            jobDesc,
            matchScore: result.matchScore,
            skillMatch: result.skillMatch,
            skillMismatch: result.skillMismatch,
            summarizeDetail: result.analysis,
            cvId: fileId,
        },
    });

    console.log(result);
    return {
        success: true,
        data: result,
    };
}
