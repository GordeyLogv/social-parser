import { SearchAccountResponse } from '@app/contracts';

export const searchAccountListenerMessage = (account: SearchAccountResponse): string => {
  return `Finded account:\nplatform - ${account.platform},\nhandle - ${account.handle},\nurl - ${account.url},\ntitle - ${account.title},\nsubscribers - ${account.subscribers},videos - \n${account.videoCount}\nAdded?`;
};
