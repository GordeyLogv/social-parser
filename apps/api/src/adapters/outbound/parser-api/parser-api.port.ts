import { SearchAccountResponse } from '@app/contracts';
export interface ParserApiPort {
  searchAccount: (handle: string, platform: string) => Promise<SearchAccountResponse>;
}
