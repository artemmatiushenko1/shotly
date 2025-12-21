import exifr from 'exifr';

export async function extractThumbnailFromImageFile(
  file: File,
): Promise<string> {
  const url = await exifr.thumbnailUrl(file);
  if (!url) {
    return '';
  }

  return url;
}
