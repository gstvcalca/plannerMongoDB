import { z } from 'zod'

const envSchema = z.object({
  API_BASE_URL: z.string().url(),
  WEB_BASE_URL: z.string().url(),
  PORT: z.coerce.number().default(3333),
  DBPASS: z.string()
})

export const env = envSchema.parse(process.env);
