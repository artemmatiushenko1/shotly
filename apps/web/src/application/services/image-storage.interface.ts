export interface UploadRequest {
  /** The URL the client should PUT the file to */
  uploadUrl: string;
  /** The public URL where the image will be visible after upload */
  publicUrl: string;
  /** The unique key/path for the file */
  key: string;
  /** Any headers the client must include (e.g., Content-Type) */
  headers?: Record<string, string>;
}

/**
 * Interface for image storage providers
 * Implementations can store images locally, in cloud storage (S3, Cloudinary, etc.), or any other storage solution
 */
export interface IImageStorage {
  /**
   * Generates a URL for the client to upload directly
   */
  prepareUpload(
    filename: string,
    contentType: string,
    bucket: string,
    folder?: string,
  ): Promise<UploadRequest>;

  /**
   * Deletes a file (Works the same for all providers)
   */
  delete(key: string, bucket: string): Promise<void>;

  /**
   * Verifies the file exists (Optional, useful for the "Confirm" step)
   */
  verifyObject(key: string, bucket: string): Promise<boolean>;

  /**
   * Moves a file. For S3, this is a Copy + Delete.
   * For local disk, this is a simple Rename.
   */
  move(
    sourceKey: string,
    destinationKey: string,
    bucket: string,
  ): Promise<void>;
}
