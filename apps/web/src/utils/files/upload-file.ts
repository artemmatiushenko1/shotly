export function uploadFileViaXhr(
  url: string,
  file: File,
  onProgress: (loaded: number, total: number) => void,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    // 1. Hook into the "upload" progress event
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        onProgress(event.loaded, event.total);
      }
    };

    // 2. Handle completion
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve();
      } else {
        reject(new Error(`Upload failed: ${xhr.statusText}`));
      }
    };

    // 3. Handle network errors
    xhr.onerror = () => reject(new Error('Network error'));

    // 4. Start the request
    xhr.open('PUT', url);
    xhr.setRequestHeader('Content-Type', file.type); // Important for S3/MinIO
    xhr.send(file);
  });
}
