"use server";

import { getCurrentSession } from "@/services/auth";
import { prisma } from "@/utils/prisma";
import { s3Client } from "@/utils/s3";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { revalidatePath } from "next/cache";

export default async function uploadCvAction(_, formData) {
    const session = await getCurrentSession();
    if (!session) {
        return {
            status: 'error',
            message: 'Unauthorized'
        }
    }

    const file = formData.get("file");
    if (!file) {
        return {
            status: 'error',
            message: 'Field is required'
        }
    }

    let key = file.name;
    const buffer = Buffer.from(await file.arrayBuffer());
    const keyExist = await prisma.cvFile.findFirst({
        where: {
            userId: session.user.id,
            fileName: key
        }
    });

    if (keyExist) {
        key = `${keyExist.fileName} -Copy`
    }
    const path = `https://pub-ffadcbf4b3be4f2f8d06bacd114a80e1.r2.dev/job-pilot/${key}`;

    try {
        const fileUpload = s3Client.send(
            new PutObjectCommand({
                Bucket: "cv",
                Key: `${session.user.name}/${key}`,
                Body: buffer,
                ContentType: file.type
            })
        )

        const cv = await prisma.cvFile.create({
            data: {
                userId: session.user.id,
                fileName: key,
                path,
                size: Number(file.size),
            }
        });

        if (!cv) {
            return {
                status: 'error',
                message: 'Failed to upload CV'
            }
        }

        console.log(fileUpload);
    } catch (error) {
        console.log(error);
    }

    revalidatePath("/my-cv");

    return {
        status: "success",
        message: "CV Uploaded successfully"
    };
}

export async function deleteCvAction(_, formData) {
    const fileId = formData.get("id");
    const fileName = formData.get("fileName");

    if (!fileId || !fileName) {
        return {
            status: 'error',
            message: 'Fields are required'
        }
    }

    try {
        const session = await getCurrentSession();
        if (!session) {
            return {
                status: 'error',
                message: 'Unauthorized'
            }
        }

        await prisma.cvFile.delete({
            where: {
                id: fileId
            }
        });

        await s3Client.send(
            new DeleteObjectCommand({
                Bucket: "cv",
                Key: `${session.user.name}/${fileName}`
            })
        );
    } catch (error) {
        console.log(error);
    }

    revalidatePath("/my-cv");

    return {
        status: "success",
        message: "Your CV has been deleted."
    };
}
