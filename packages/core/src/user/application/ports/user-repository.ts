import { UserEntity } from '../../domain';

export interface UserRepositoryPort {
  save: (user: UserEntity) => Promise<void>;
}
