import { s3Client } from "@/utils/s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function generatePresignedUrl(fileName) {
    const command = new GetObjectCommand({
        Bucket: "cv",
        Key: `user/${fileName}`,
    });

    const previewUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // 1 jam
    return previewUrl;
}