export class NotEnoughStorageError extends Error {
  static readonly DIGEST = 'not-enough-storage';
  digest: string;

  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.digest = NotEnoughStorageError.DIGEST;
  }
}
