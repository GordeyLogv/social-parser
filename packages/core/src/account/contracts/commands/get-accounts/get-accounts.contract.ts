import { Account } from '../../../domain';

export interface GetAccountsInput {
  userTelegramId: number;
}

export interface GetAccountsOutput {
  accounts: Account[];
}
