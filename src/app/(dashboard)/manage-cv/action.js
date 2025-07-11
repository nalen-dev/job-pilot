"use server";

import { prisma } from "@/utils/prisma";
import { s3Client } from "@/utils/s3";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { revalidatePath } from "next/cache";

export default async function uploadCvAction(_, formData) {
    const file = formData.get("file");

    const key = file.name;
    const buffer = Buffer.from(await file.arrayBuffer());
    const path = `https://pub-ffadcbf4b3be4f2f8d06bacd114a80e1.r2.dev/job-pilot/${key}`;

    try {
        const fileUpload = s3Client.send(
            new PutObjectCommand({
                Bucket: "cv",
                Key: `user/${key}`,
                Body: buffer,
                ContentType: file.type
            })
        )

        //USER ID MASIH STATIS BELUM DAPAT DARI SESSION
        await prisma.cvFile.create({
            data: {
                userId: "aa",
                fileName: key,
                path,
                size: Number(file.size),
            }
        })

        console.log(fileUpload);
    } catch (error) {
        console.log(error);
    }

    revalidatePath("/my-cv");

    return {
        status: "success"
    };
}

export async function deleteCvAction(_, formData) {
    const fileId = formData.get("id");
    const fileName = formData.get("fileName");

    try {
        await prisma.cvFile.delete({
            where: {
                id: fileId
            }
        });

        await s3Client.send(
            new DeleteObjectCommand({
                Bucket: "cv",
                Key: `user/${fileName}`
            })
        );
    } catch (error) {
        console.log(error);
    }

    revalidatePath("/my-cv");

    return {
        status: "success"
    };
}
