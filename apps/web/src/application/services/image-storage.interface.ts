/**
 * Result of an image upload operation
 */
export interface UploadResult {
  /** The URL or path to access the uploaded image */
  url: string;
  /** Optional unique identifier for the uploaded file */
  key: string;
}

/**
 * Options for uploading an image
 */
export interface UploadOptions {
  /** Optional folder/path prefix for organizing uploads */
  folder?: string;
  /** Optional filename. If not provided, a unique name will be generated */
  filename?: string;
  /** Optional max file size in bytes */
  maxSize?: number;
  /** Optional allowed MIME types */
  allowedMimeTypes?: string[];
}

/**
 * Options for moving/renaming an image
 */
export interface MoveOptions {
  /** Optional target folder/path prefix */
  folder?: string;
  /** Optional new filename. If not provided, the original filename is preserved */
  filename?: string;
}

/**
 * Interface for image storage providers
 * Implementations can store images locally, in cloud storage (S3, Cloudinary, etc.), or any other storage solution
 */
export interface IImageStorage {
  /**
   * Upload an image file to storage
   * @param file - The file buffer or File object to upload
   * @param options - Upload options
   * @returns Promise resolving to the upload result with the image URL
   */
  upload(file: Buffer | File, options?: UploadOptions): Promise<UploadResult>;

  /**
   * Delete an image from storage
   * @param keyOrUrl - The storage key or URL of the image to delete
   * @returns Promise resolving when deletion is complete
   */
  delete(keyOrUrl: string): Promise<void>;

  /**
   * Move or rename an image in storage
   * @param keyOrUrl - The current storage key or URL of the image
   * @param options - Move options (target folder/filename)
   * @returns Promise resolving to the new upload result with the updated URL/key
   */
  move(keyOrUrl: string, options?: MoveOptions): Promise<UploadResult>;

  /**
   * Get the public URL for an image
   * @param keyOrUrl - The storage key or URL
   * @returns The public URL to access the image
   */
  getUrl(keyOrUrl: string): string;
}
