export abstract class DomainError extends Error {
  readonly isDomainError = true;
  abstract readonly code: string;

  protected constructor(message: string) {
    super(message);
  }
}
