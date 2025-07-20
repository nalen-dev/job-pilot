"use server";
import { getCurrentSession } from "@/services/auth";
import { s3Client } from "@/utils/s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function generatePresignedUrl(fileName) {
    const session = await getCurrentSession();
    const command = new GetObjectCommand({
        Bucket: "cv",
        Key: `${session.user.id}/${fileName}`,
    });

    const previewUrl = await getSignedUrl(s3Client, command, { expiresIn: 86400 }); // 1 hari
    return previewUrl;
}