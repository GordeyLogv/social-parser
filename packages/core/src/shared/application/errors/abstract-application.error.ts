export abstract class ApplicationError extends Error {
  readonly isApplicationError = true;
  abstract readonly code: string;

  protected constructor(message: string) {
    super(message);
  }
}
