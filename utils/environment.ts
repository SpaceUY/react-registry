import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_BASE_URL: z
    .string()
    .optional()
    .default("https://spaceuy.github.io/react-registry/"),
});

export const envVars = envSchema.parse(process.env);

export type EnvVars = z.infer<typeof envSchema>;
