import { UploadRequest } from '@/application/services/image-storage.interface';

import { IImageStorage } from '../image-storage-service';

import {
  CopyObjectCommand,
  CreateBucketCommand,
  DeleteObjectCommand,
  HeadBucketCommand,
  HeadObjectCommand,
  PutBucketPolicyCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export class S3ImageStorageService implements IImageStorage {
  private client: S3Client;
  private publicBaseUrl: string;

  constructor(
    region: string,
    endpoint: string,
    accessKeyId: string,
    secretAccessKey: string,
    publicUrl: string,
  ) {
    this.client = new S3Client({
      region,
      endpoint,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      forcePathStyle: true,
    });

    this.publicBaseUrl = publicUrl;

    ['tmp', 'photos', 'covers', 'profiles'].forEach(async (bucketName) => {
      await this.ensureBucketExists(bucketName);
    });
  }

  private async ensureBucketExists(bucketName: string) {
    try {
      // 1. Check if bucket exists
      await this.client.send(new HeadBucketCommand({ Bucket: bucketName }));
    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'NotFound') {
        console.log(`Bucket '${bucketName}' missing. Creating now...`);

        // 2. Create Bucket
        await this.client.send(new CreateBucketCommand({ Bucket: bucketName }));

        // 3. Make it Public (Read-Only for everyone)
        const policy = {
          Version: '2012-10-17',
          Statement: [
            {
              Sid: 'PublicReadGetObject',
              Effect: 'Allow',
              Principal: '*',
              Action: 's3:GetObject',
              Resource: `arn:aws:s3:::${bucketName}/*`,
            },
          ],
        };

        await this.client.send(
          new PutBucketPolicyCommand({
            Bucket: bucketName,
            Policy: JSON.stringify(policy),
          }),
        );

        console.log('Bucket created and configured!');
      }
    }
  }

  async move(
    sourceKey: string,
    destinationKey: string,
    bucket: string,
  ): Promise<void> {
    try {
      await this.client.send(
        new CopyObjectCommand({
          Bucket: bucket,
          CopySource: `${bucket}/${sourceKey}`,
          Key: destinationKey,
        }),
      );

      await this.client.send(
        new DeleteObjectCommand({
          Bucket: bucket,
          Key: sourceKey,
        }),
      );
    } catch (error) {
      console.error('Move failed:', error);
      throw new Error('Failed to move file in S3');
    }
  }

  async prepareUpload(
    filename: string,
    contentType: string,
    bucket: string,
    folder: string = '',
  ): Promise<UploadRequest> {
    // 1. Sanitize the folder path (remove trailing slashes to avoid double //)
    const cleanFolder = folder.replace(/\/$/, '');

    // 2. Construct the Key safely
    // If folder is provided: "folder/filename"
    // If no folder: "filename"
    const key = cleanFolder ? `${cleanFolder}/${filename}` : filename;

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      ContentType: contentType,
    });

    const uploadUrl = await getSignedUrl(this.client, command, {
      expiresIn: 3600,
    });

    const publicUrl = `${this.publicBaseUrl}/${bucket}/${key}`;

    return { uploadUrl: uploadUrl, publicUrl, key };
  }

  async verifyObject(key: string, bucket: string): Promise<boolean> {
    try {
      await this.client.send(
        new HeadObjectCommand({ Bucket: bucket, Key: key }),
      );
      return true;
    } catch {
      return false;
    }
  }

  async delete(key: string, bucket: string): Promise<void> {
    await this.client.send(
      new DeleteObjectCommand({ Bucket: bucket, Key: key }),
    );
  }
}
