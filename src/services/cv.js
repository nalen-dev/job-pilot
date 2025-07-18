"use server";
import { prisma } from "@/utils/prisma";
import { getCurrentSession } from "./auth";
import { redirect } from "next/navigation";
import { generatePresignedUrl } from "@/utils/presigned-url"

export async function getCVByUserId() {
    const session = await getCurrentSession();
    if (!session) {
        redirect("/login");
    }
    const files = await prisma.cvFile.findMany({
        where: { userId: session.user.id },
        select: {
            id: true,
            objectKey: true,
            fileName: true,
            path: true,
            createdAt: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    const filesWithUrl = await Promise.all(
        files.map(async (file) => ({
            ...file,
            previewUrl: await generatePresignedUrl(file.objectKey),
        }))
    );

    return filesWithUrl;
}