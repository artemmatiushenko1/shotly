export class DatabaseOperationError extends Error {
  static readonly DIGEST = 'database-operation-error';
  digest: string;

  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.digest = DatabaseOperationError.DIGEST;
  }
}

export class NotFoundError extends Error {
  static readonly DIGEST = 'not-found';
  digest: string;

  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.digest = NotFoundError.DIGEST;
  }
}

export class ForbiddenError extends Error {
  static readonly DIGEST = 'forbidden';
  digest: string;

  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.digest = ForbiddenError.DIGEST;
  }
}

export class InputParseError extends Error {
  static readonly DIGEST = 'input-parse-error';
  digest: string;

  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.digest = InputParseError.DIGEST;
  }
}

export class ConflictError extends Error {
  static readonly DIGEST = 'conflict-error';
  digest: string;

  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.digest = ConflictError.DIGEST;
  }
}
