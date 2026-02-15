import { Account } from '../../domain';

export interface AccountRepositoryPort {
  findByTelegramId: (userTelegramId: number) => Promise<Account[]>;

  findTopAccouns: () => Promise<Account[]>;

  save: (account: Account) => Promise<void>;
}
