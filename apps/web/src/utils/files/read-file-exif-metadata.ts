import exifr from 'exifr';

import { PhotoMetadata } from '@/entities/models/photo';

export async function getPhotoMetadata(
  file: File,
): Promise<PhotoMetadata & { width: number; height: number }> {
  // 1. Parse the file
  // We only enable specific blocks to keep it fast (TIFF contains the main EXIF)
  const tags = await exifr.parse(file, {
    tiff: true,
    exif: true,
    gps: false, // Turn off if you don't need location (privacy)
    xmp: false,
    icc: false,
  });

  // 2. Get Dimensions
  // exifr tries to find dimensions in EXIF, but they aren't always reliable.
  // The most robust method for dimensions is still loading the image bitmap.
  let width = tags?.ExifImageWidth;
  let height = tags?.ExifImageHeight;

  // Fallback: If EXIF dimensions are missing (common in web-optimized images)
  if (!width || !height) {
    const bmp = await createImageBitmap(file);
    width = bmp.width;
    height = bmp.height;
    bmp.close(); // Clean up memory immediately
  }

  // 3. Handle Orientation (Swapping W/H for portrait)
  // exifr extracts 'Orientation' as a number by default
  if (tags?.Orientation && [5, 6, 7, 8].includes(tags.Orientation)) {
    [width, height] = [height, width];
  }

  // 4. Return Normalized Data
  return {
    width,
    height,
    cameraMake: tags?.Make,
    cameraModel: tags?.Model,
    // Different cameras store Lens info in different tags
    lens: tags?.LensModel || tags?.Lens || undefined,
    iso: tags?.ISO,
    aperture: tags?.FNumber, // Returns 2.8 directly
    focalLength: tags?.FocalLength,
    shutterSpeed: tags?.ExposureTime,
  };
}
