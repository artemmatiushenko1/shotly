import 'server-only';
import { randomBytes } from 'crypto';
import { promises as fs } from 'fs';
import path from 'path';

import { MimeType } from '@/utils/files/enums';

import {
  IImageStorage,
  UploadOptions,
  UploadResult,
} from '../../application/services/image-storage.interface';

/**
 * Local file system implementation of image storage
 * Stores images in the public/uploads directory
 */
export class LocalImageStorageService implements IImageStorage {
  private readonly baseDir: string;
  private readonly baseUrl: string;

  constructor(baseDir: string, baseUrl: string) {
    this.baseDir = baseDir;
    this.baseUrl = baseUrl;
  }

  async upload(
    file: Buffer | File,
    options: UploadOptions = {},
  ): Promise<UploadResult> {
    const { filename, maxSize } = options;

    // Sanitize folder: remove leading slashes to ensure path.join works relatively
    // and URLs don't end up with double slashes (e.g. base//folder)
    const folder = options.folder ? options.folder.replace(/^\/+/, '') : '';

    // Convert File to Buffer if needed
    const buffer =
      file instanceof File ? Buffer.from(await file.arrayBuffer()) : file;

    // Validate file size
    if (maxSize && buffer.length > maxSize) {
      throw new Error(
        `File size ${buffer.length} exceeds maximum allowed size ${maxSize}`,
      );
    }

    // Generate unique filename if not provided
    const fileExtension = this.getFileExtension(file, filename);
    const finalFilename =
      filename ||
      `${randomBytes(16).toString('hex')}${fileExtension ? `.${fileExtension}` : ''}`;

    // Construct the full path
    const folderPath = folder ? path.join(this.baseDir, folder) : this.baseDir;
    const filePath = path.join(folderPath, finalFilename);

    // Ensure directory exists
    await fs.mkdir(folderPath, { recursive: true });

    // Write file to disk
    await fs.writeFile(filePath, buffer);

    // Construct the public URL
    const relativePath = folder
      ? path.join(folder, finalFilename).replace(/\\/g, '/')
      : finalFilename;
    const url = `${this.baseUrl}/${relativePath}`;

    return {
      url,
      key: relativePath,
    };
  }

  /**
   * Moves a file from one location to another
   * @param keyOrUrl The current key or URL of the file
   * @param options Target folder and optional new filename
   */
  async move(
    keyOrUrl: string,
    options: { folder?: string; filename?: string } = {},
  ): Promise<UploadResult> {
    // Sanitize target folder
    const targetFolder = options.folder
      ? options.folder.replace(/^\/+/, '')
      : '';

    // 1. Resolve source path
    const oldRelativePath = keyOrUrl.startsWith(this.baseUrl)
      ? keyOrUrl.replace(this.baseUrl + '/', '')
      : keyOrUrl;

    const oldFilePath = path.join(this.baseDir, oldRelativePath);

    // 2. Verify source exists
    try {
      await fs.access(oldFilePath);
    } catch {
      throw new Error(`File not found: ${keyOrUrl}`);
    }

    // 3. Determine destination
    const currentFilename = path.basename(oldRelativePath);
    const finalFilename = options.filename || currentFilename;

    const folderPath = targetFolder
      ? path.join(this.baseDir, targetFolder)
      : this.baseDir;

    const newFilePath = path.join(folderPath, finalFilename);

    // 4. Ensure destination directory exists and move file
    await fs.mkdir(folderPath, { recursive: true });
    await fs.rename(oldFilePath, newFilePath);

    // 5. Return new details
    const newRelativePath = targetFolder
      ? path.join(targetFolder, finalFilename).replace(/\\/g, '/')
      : finalFilename;

    return {
      url: `${this.baseUrl}/${newRelativePath}`,
      key: newRelativePath,
    };
  }

  async delete(keyOrUrl: string): Promise<void> {
    // Extract the relative path from URL or use the key directly
    const relativePath = keyOrUrl.startsWith(this.baseUrl)
      ? keyOrUrl.replace(this.baseUrl + '/', '')
      : keyOrUrl;

    const filePath = path.join(this.baseDir, relativePath);

    try {
      await fs.unlink(filePath);
    } catch (error) {
      // File might not exist, which is fine
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
        throw error;
      }
    }
  }

  getUrl(keyOrUrl: string): string {
    // If it's already a full URL, return it
    if (keyOrUrl.startsWith('http://') || keyOrUrl.startsWith('https://')) {
      return keyOrUrl;
    }

    // If it starts with the base URL, return as is
    if (keyOrUrl.startsWith(this.baseUrl)) {
      return keyOrUrl;
    }

    // Otherwise, construct the URL
    return `${this.baseUrl}/${keyOrUrl}`;
  }

  private getFileExtension(file: Buffer | File, filename?: string): string {
    // If filename is provided, extract extension from it
    if (filename) {
      const ext = path.extname(filename);
      return ext ? ext.slice(1) : '';
    }

    // For File objects, try to get from type
    if (file instanceof File) {
      const mimeType = file.type;
      const ext = this.mimeTypeToExtension(mimeType);
      if (ext) return ext;
    }

    // Default to empty extension
    return '';
  }

  private mimeTypeToExtension(mimeType: string): string {
    const mimeMap: Record<string, string> = {
      [MimeType.JPEG]: 'jpg',
      [MimeType.JPG]: 'jpg',
      [MimeType.PNG]: 'png',
      [MimeType.WEBP]: 'webp',
      [MimeType.GIF]: 'gif',
      [MimeType.SVG]: 'svg',
    };
    return mimeMap[mimeType.toLowerCase()] || '';
  }
}
