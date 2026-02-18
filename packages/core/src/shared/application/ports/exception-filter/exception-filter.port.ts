export interface ExceptionFilterPort {
  catchCustomError: (error: unknown) => void;
}
