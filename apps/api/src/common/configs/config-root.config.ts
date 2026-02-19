import { ConfigModuleOptions } from '@nestjs/config';

export const configRoot: ConfigModuleOptions = {
  isGlobal: true,
  envFilePath: '.development.env',
};
