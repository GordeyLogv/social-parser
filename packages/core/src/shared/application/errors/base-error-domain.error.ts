export abstract class DomainError extends Error {
  public readonly isDomainError = true;

  public abstract readonly code: string;

  protected constructor(message: string) {
    super(message);
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
