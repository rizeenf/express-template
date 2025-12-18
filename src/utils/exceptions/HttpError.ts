export class HttpError extends Error {
  public status: number;

  constructor(status: number, message: string) {
    super(message);

    this.status = status;
    this.name = this.constructor.name;

    // Fix prototype chain
    Object.setPrototypeOf(this, HttpError.prototype);

    // Capture correct stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
