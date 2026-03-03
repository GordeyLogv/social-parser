import {
  AddUserRequest,
  AddUserResponse,
  SearchAccountRequest,
  SearchAccountResponse,
  ConfirmAccountRequest,
  ConfirmAccountResponse,
} from '@app/contracts';

export interface ServerApiPort {
  addUser: (input: AddUserRequest) => Promise<AddUserResponse>;

  searchAccount: (input: SearchAccountRequest) => Promise<SearchAccountResponse>;
  confirmAccount: (input: ConfirmAccountRequest) => Promise<ConfirmAccountResponse>;
}
