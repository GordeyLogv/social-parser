import { IAccountToPrimitives } from '../../domain';

export interface AccountRepositoryPort {
  save: (account: IAccountToPrimitives) => Promise<void>;
}
