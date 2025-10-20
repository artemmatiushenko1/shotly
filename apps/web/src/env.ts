import z from 'zod';

const EnvSchema = z.object({
  auth: z.object({
    betterAuth: z.object({
      secret: z.string().nonempty(),
      baseUrl: z.url(),
    }),
    google: z.object({
      clientId: z.string().nonempty(),
      clientSecret: z.string().nonempty(),
    }),
  }),
  database: z.object({
    url: z.url(),
  }),
});

export const env = EnvSchema.parse({
  auth: {
    betterAuth: {
      secret: process.env.BETTER_AUTH_SECRET,
      baseUrl: process.env.BETTER_AUTH_URL,
    },
    google: {
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    },
  },
  database: {
    url: process.env.DATABASE_URL,
  },
});
