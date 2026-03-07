import { z } from 'zod';

export const NormalizedErrorResponseSchema = z.object({
  type: z.enum(['app', 'infra', 'unknown']),
  code: z.string(),
  message: z.string(),
  logLevel: z.enum(['warn', 'error']),
  meta: z.record(z.string(), z.unknown()).optional(),
});

export type NormalizedErrorResponse = z.infer<typeof NormalizedErrorResponseSchema>;
