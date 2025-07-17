import { prisma } from "@/utils/prisma";
import { logger, task, wait } from "@trigger.dev/sdk/v3";
import { openai } from "@/utils/ai";

export const generateAnalysisTask = task({
    id: "generate-analysis",
    // Set an optional maxDuration to prevent tasks from running indefinitely
    maxDuration: 300, // Stop executing after 300 secs (5 mins) of compute
    run: async (payload, { ctx }) => {
        logger.log("Generating analysis", { payload, ctx });

        let file;
        try {
            const res = await fetch(payload.fileUrl);
            if (!res.ok) {
                return {
                    status: 'error',
                    message: 'Failed to fetch CV file'
                }
            };
            const arrayBuffer = await res.arrayBuffer();
            const blob = new Blob([arrayBuffer], { type: res.headers.get("content-type") || "application/pdf" });
            file = new File([blob], "cv.pdf", { type: blob.type });
        } catch (error) {
            console.log(error);
            return {
                status: 'error',
                message: 'Failed to process CV file'
            }
        }

        let result;
        const PROMPT = `You are a professional resume analyzer. Analyze the given CV file with job description: ${payload.jobDesc}

      Extract the following:
      1. jobTitle: extracted from job description
      2. matchScore: Percentage (0 until 100) indicating how well the CV aligns with the job description.
      3. skillMatch: ONLY list of explicit technical or professional skills that appear in both the job description and the CV. Do not include soft skills, traits, education, GPA, or generic terms.
      4. skillMismatch: ONLY technical or professional skills from the job description that are missing in the CV. Exclude soft skills or attitudes. Do not mention "not explicitly stated".
      5. analysis: Write with:

      ### 💪 Strength
      - Mention strong qualifications, experiences, skills relevant to the job, or etc.
      - You may highlight things like education, GPA, project experience, soft skills, or internships.

      ### 🔴 Weakness
      - Mention what is missing or could be improved, such as lack of specific skills, unclear experience, or relevance

      ### 🚀 Improvement
      - What to improve to increase job fit
      - Is the CV clear and well-structured? If not, suggest improvements
      - Any important sections that are missing in the CV (e.g., portfolio, contact)
      - Is it ATS-friendly? If not, explain why and how to fix it.

      ### 📌 Conclusion
      - Final summary

      IMPORTANT
      - Use professional tone
      - Make sure to proofread and edit your work for clarity, coherence, and correctness.
      - Use "No Information Available" if the information is not available.
      `;

        try {
            const uploadedFile = await openai.files.create({
                file: file,
                purpose: "user_data"
            });

            const response = await openai.responses.parse({
                model: "gpt-4.1",
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
                                text: PROMPT
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
                                    description: "The title of the job description"
                                },
                                matchScore: {
                                    type: "number",
                                    description: "Match percentage between CV and job description (0 until 100)"
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
                                    description: "analyze with sections: strengths, waekness, improvement and conclusion"
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
            return {
                status: 'error',
                message: 'Failed to analyze CV'
            }
        }

        try {
            await prisma.aiSummarization.update({
                where: {
                    id: payload.id
                },
                data: {
                    jobTitle: result.jobTitle,
                    matchScore: result.matchScore,
                    skillMatch: result.skillMatch,
                    skillMismatch: result.skillMismatch,
                    summarizeDetail: result.analysis,
                    status: "completed",
                },
            });
        } catch (error) {
            console.log(error);
            return {
                status: "error",
                message: "Failed to save result to database.",
            };
        }

        console.log(result);
        return {
            status: 'success',
            message: result,
        };
    },
    onSuccess: async (payload, { ctx }) => {
        logger.log("Analysis generated", { payload, ctx });
    },
    onError: async (payload, { ctx }) => {
        logger.log("Analysis failed", { payload, ctx });
    },
});