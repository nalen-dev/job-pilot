"use server";

import { getCurrentSession } from "@/services/auth";
import { generateAnalysisTask } from "@/trigger/analyze-task";
import { prisma } from "@/utils/prisma";
import { revalidatePath } from "next/cache";

export async function analyzeCVAction(_, formData) {
    const session = await getCurrentSession();
    if (!session) {
        return {
            status: 'error',
            message: 'Unauthorized'
        }
    }

    const selectedFile = formData.get('selectedFile');
    const jobDesc = formData.get('jobDesc');

    if (!selectedFile || !jobDesc) {
        return {
            status: 'error',
            message: 'Fields are required'
        }
    };

    const { fileId, fileUrl } = JSON.parse(selectedFile);
    console.log("Selected file:", fileUrl);

    try {
        const project = await prisma.aiSummarization.create({
            data: {
                cvId: fileId,
                userId: session.user.id,
                jobDesc,
                skillMatch: [],
                skillMismatch: []
            },
        });

        revalidatePath("/analyze-cv");
        const analysis = await generateAnalysisTask.trigger({ jobDesc, fileUrl, id: project.id });
        return analysis
    } catch (error) {
        console.log(error);
    }
}

export async function deleteSummaryAction(_,formData){
    const id = formData.get("id");

    try {
        await prisma.aiSummarization.delete({
            where: {
                id
            }
        });
    } catch (error) {
        console.log(error);
    }

    revalidatePath("/analyze-cv");

    return {
        status: "success",
        message: "Your CV has been deleted."
    };
}
