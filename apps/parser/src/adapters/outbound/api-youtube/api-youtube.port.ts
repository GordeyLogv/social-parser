import { SearchAccountResponse } from '@app/contracts';

export interface ApiYoutubePort {
  searchByHandle: (handle: string) => Promise<SearchAccountResponse>;
}
