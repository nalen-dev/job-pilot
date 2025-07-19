"use server";

import { getCurrentSession } from "@/services/auth";
import { prisma } from "@/utils/prisma";
import { s3Client } from "@/utils/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { revalidatePath } from "next/cache";

export async function editProfileAction(_, formData) {
    const session = await getCurrentSession();
    if (!session) {
        return {
            status: 'error',
            message: 'Unauthorized'
        }
    }
    const file = formData.get("file");
    const name = formData.get("name");
    if (!name) {
        return {
            status: 'error',
            message: 'Field is required'
        }
    }

    const key = `${session.user.id}/avatar`;
    const buffer = Buffer.from(await file.arrayBuffer());
    const path = `https://pub-ffadcbf4b3be4f2f8d06bacd114a80e1.r2.dev/cv/${key}`;

    try {
        const fileUpload = await s3Client.send(
            new PutObjectCommand({
                Bucket: "cv",
                Key: key,
                ContentType: file.type,
                Body: buffer,
            })
        );

        await prisma.user.update({
            where: {
                id: session.user.id,
            },
            data: {
                avatar: path,
                name
            },
        });

        console.log(fileUpload, "Upload OK! ✅");
    } catch (error) {
        console.log(error);
    }

    revalidatePath("/settings");
}