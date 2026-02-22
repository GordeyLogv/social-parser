import { AddUserRequest } from '@app/contracts';

export interface UserApiPort {
  addUser: (input: AddUserRequest) => Promise<void>;
}
