const convertBytesToGb = (bytes: number) => {
  return bytes / 1024 / 1024 / 1024;
};

const convertBytesToMb = (bytes: number) => {
  return bytes / 1024 / 1024;
};

export { convertBytesToGb, convertBytesToMb };
