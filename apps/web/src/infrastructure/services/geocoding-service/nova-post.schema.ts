import z from 'zod';

const NovaPostSettlementSchema = z.object({
  Ref: z.string(),
  Description: z.string(), // settlement name (UA)
  SettlementTypeDescription: z.string().optional(),
  RegionsDescription: z.string().optional().default(''), // district/raion
  AreaDescription: z.string().optional().default(''), // oblast
  Latitude: z.coerce.string().default('0'),
  Longitude: z.coerce.string().default('0'),
});

export type NovaPostSettlement = z.infer<typeof NovaPostSettlementSchema>;

export const NovaBaseResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(NovaPostSettlementSchema),
});
