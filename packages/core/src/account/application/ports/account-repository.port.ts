import { AccountEntity } from '../../domain';

export interface AccountRepositoryPort {
  save: (account: AccountEntity) => Promise<void>;
}
