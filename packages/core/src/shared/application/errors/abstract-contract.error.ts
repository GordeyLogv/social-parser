export abstract class ContractError extends Error {
  readonly isContractError = true;
  abstract readonly code: string;

  protected constructor(message: string) {
    super(message);
  }
}
