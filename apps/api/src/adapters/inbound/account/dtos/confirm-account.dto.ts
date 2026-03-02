import { createZodDto } from 'nestjs-zod';

import { ConfirmAccountRequestSchema } from '@app/contracts';

export class ConfirmAccountDto extends createZodDto(ConfirmAccountRequestSchema) {}
