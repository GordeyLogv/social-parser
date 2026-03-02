import { createZodDto } from 'nestjs-zod';

import { SearchAccountRequestSchema } from '@app/contracts';

export class SearchAccountDto extends createZodDto(SearchAccountRequestSchema) {}
