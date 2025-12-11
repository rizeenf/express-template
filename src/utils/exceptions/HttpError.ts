export class HttpError extends Error {
  public status: number;

  constructor(status: number, message: string) {
    super(message);

    this.status = status;
    this.name = this.constructor.name;

    // Fix prototype chain for TypeScript
    Object.setPrototypeOf(this, HttpError.prototype);

    // Capture correct stack trace (optional but recommended)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
