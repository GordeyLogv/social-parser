import { z } from 'zod';

export const SearchAccountRequestSchema = z.object({
  telegramId: z.string(),
  handle: z.string(),
  platform: z.string(),
});

export const SearchAccountResponseSchema = z.object({
  url: z.url(),
});

export type SearchAccountRequest = z.infer<typeof SearchAccountRequestSchema>;
export type SearchAccountResponse = z.infer<typeof SearchAccountResponseSchema>;

export const ConfirmAccountRequestSchema = z.object({
  telegramId: z.string(),
  handle: z.string(),
  platform: z.string(),
  url: z.string(),
});

export const ConfirmAccountResponseSchema = z.void();

export type ConfirmAccountRequest = z.infer<typeof ConfirmAccountRequestSchema>;
export type ConfirmAccountResponse = z.infer<typeof ConfirmAccountResponseSchema>;
