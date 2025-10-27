import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  endpoint: process.env.S3_ENDPOINT,
  region: process.env.S3_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
  forcePathStyle: true, // Required for MinIO
});

export async function getUploadUrl(
  key: string,
  contentType: string,
  expiresIn: number = 3600
): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET!,
    Key: key,
    ContentType: contentType,
  });

  return await getSignedUrl(s3Client, command, { expiresIn });
}

export async function getDownloadUrl(
  key: string,
  expiresIn: number = 3600
): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET!,
    Key: key,
  });

  return await getSignedUrl(s3Client, command, { expiresIn });
}

export function generateFileKey(
  sessionId: string,
  filename: string
): string {
  const timestamp = Date.now();
  const sanitized = filename.replace(/[^a-zA-Z0-9.-]/g, "_");
  return `sessions/${sessionId}/${timestamp}-${sanitized}`;
}
