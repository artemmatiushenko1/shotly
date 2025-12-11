export const mbToBytes = (mb: number) => mb * 1024 * 1024;

export const convertBytesToGb = (bytes: number) => {
  return bytes / 1024 / 1024 / 1024;
};

export const convertBytesToMb = (bytes: number) => {
  return bytes / 1024 / 1024;
};
