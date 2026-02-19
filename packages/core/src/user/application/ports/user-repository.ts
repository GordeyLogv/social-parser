import { UserEntity } from '../../domain';

export interface UserRepositoryPort {
  addUser: (user: UserEntity) => Promise<void>;
}
