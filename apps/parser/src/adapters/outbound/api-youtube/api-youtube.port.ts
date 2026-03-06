import { SearchAccountRequest, SearchAccountResponse } from '@app/contracts';

export interface ApiYoutubePort {
  searchByHandle: (handle: string, platform: string) => Promise<SearchAccountResponse>;
}
