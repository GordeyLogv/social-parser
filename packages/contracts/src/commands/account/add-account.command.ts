import { z } from 'zod';

export const SearchAccountRequestSchema = z.object({
  telegramId: z.string(),
  handle: z.string(),
  platform: z.string(),
});

export const SearchAccountResponseSchema = z.object({
  platform: z.string(),
  handle: z.string(),
  url: z.string(),
  title: z.string(),
  subscribers: z.number(),
  videoCount: z.number(),
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

export const YouTubeChannelResponseChema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      snippet: z.object({
        title: z.string(),
        customUrl: z.string().optional(),
        country: z.string().optional(),
      }),
      statistics: z.object({
        subscriberCount: z.string().optional(),
        videoCount: z.string().optional(),
      }),
    }),
  ),
});

export type YouTubeChannelResponse = z.infer<typeof YouTubeChannelResponseChema>;
