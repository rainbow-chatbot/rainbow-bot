export class Result<T, F> {
  success: T;
  fail: F;

  constructor(success: T, fail: F) {
    this.success = success;
    this.fail = fail;
  }
}