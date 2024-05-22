import { z } from 'zod'

export const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'production', 'test']).optional().default('dev'),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  REDIS_HOST: z.string().optional().default('localhost'),
  REDIS_PORT: z.coerce.number().optional().default(6379),
  MONGO_URL: z.coerce.string().optional().default('mongodb://localhost:2727'),
  MAIL_HOST: z.string(),
  MAIL_SECURE: z.string(),
  MAIL_PORT: z.coerce.number(),
  MAIL_USER: z.string(),
  MAIL_USER_EMAIL: z.string(),
  MAIL_PASSWORD: z.string(),
  MAIL_IGNORE_TLS: z.string().transform((value) => value === 'true'),
  AWS_BUCKET_NAME: z.string(),
  AWS_BUCKET_ENDPOINT: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY_ID: z.string(),
  FRONT_END_URL: z.string().optional().default('http://localhost:3000'),
  PORT: z.coerce.number().optional().default(3333),
})

export type Env = z.infer<typeof envSchema>
