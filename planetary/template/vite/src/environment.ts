import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

    // Database Configuration
  DATABASE_URL: z.string().optional(),
  DATABASE_MAX_CONNECTIONS: z.string().default("10"),

  // PostHog Configuration
  POSTHOG_API_KEY: z.string(),
  POSTHOG_HOST: z.string().default("https://app.posthog.com"),
});

export const envVars = envSchema.parse(process.env);

export type EnvVars = z.infer<typeof envSchema>;
