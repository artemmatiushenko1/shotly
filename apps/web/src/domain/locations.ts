import z from 'zod';

export const locationDetailsSchema = z.object({
  lat: z
    .string()
    .regex(/^[-+]?\d+(\.\d+)?$/, 'lat must be a number-like string'),
  lon: z
    .string()
    .regex(/^[-+]?\d+(\.\d+)?$/, 'lon must be a number-like string'),
  externalId: z.string().min(1),
  name: z.string().min(1),
  displayName: z.string().min(1),
  country: z.string().min(1),
});
export type LocationDetails = z.infer<typeof locationDetailsSchema>;
