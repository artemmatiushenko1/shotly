import z from 'zod';

export const photoMetadataSchema = z.object({
  cameraMake: z.string().nullish(),
  cameraModel: z.string().nullish(),
  lens: z.string().nullish(),
  focalLength: z.number().nullish(),
  aperture: z.number().nullish(),
  shutterSpeed: z.number().nullish(),
  iso: z.number().nullish(),
});

export type PhotoMetadata = z.infer<typeof photoMetadataSchema>;

export enum PhotoUploadStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
}

export const photoSchema = z.object({
  id: z.string(),
  url: z.string(),
  metadata: photoMetadataSchema,
  sizeInBytes: z.number(),
  originalFilename: z.string(),
  width: z.number(),
  height: z.number(),
  format: z.string(), // content-type/mime-type
  createdAt: z.date(),
  collectionId: z.string(),
  storageKey: z.string(),
  status: z.enum(PhotoUploadStatus),
  thumbnailUrl: z.string(),
  thumbnailKey: z.string(),
});

export type Photo = z.infer<typeof photoSchema>;

export const createPhotoInputSchema = photoSchema.pick({
  originalFilename: true,
  sizeInBytes: true,
  format: true,
  url: true,
  storageKey: true,
  thumbnailUrl: true,
  thumbnailKey: true,
  width: true,
  height: true,
  metadata: true,
});

export type CreatePhotoInput = z.infer<typeof createPhotoInputSchema>;
