import { z } from 'zod';

export const AddUserRequestSchema = z.object({
  telegramId: z.string(),
  firstName: z.optional(z.string()),
});

export const AddUserResponseSchema = z.void();

export type AddUserRequest = z.infer<typeof AddUserRequestSchema>;
export type AddUserResponse = z.infer<typeof AddUserResponseSchema>;
