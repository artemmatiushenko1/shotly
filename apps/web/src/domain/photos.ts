import z from 'zod';

export const photoMetadataSchema = z.object({
  cameraMake: z.string().optional(),
  cameraModel: z.string().optional(),
  lens: z.string().optional(),
  focalLength: z.string().optional(),
  aperture: z.string().optional(),
  shutterSpeed: z.string().optional(),
  iso: z.number().optional(),
});

export type PhotoMetadata = z.infer<typeof photoMetadataSchema>;

export const photoSchema = z.object({
  id: z.string(),
  url: z.string(),
  metadata: photoMetadataSchema,
  sizeInBytes: z.number(),
  originalFilename: z.string(),
  width: z.number(),
  height: z.number(),
  format: z.string(),
  createdAt: z.date(),
});

export type Photo = z.infer<typeof photoSchema>;
