import { createZodDto } from 'nestjs-zod';

import { AddUserRequestSchema } from '@app/contracts';

export class AddUserDto extends createZodDto(AddUserRequestSchema) {}
