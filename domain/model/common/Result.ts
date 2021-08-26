export class Result<S, F> {
  success: S;
  fail: F;

  constructor(success: S, fail: F) {
    this.success = success;
    this.fail = fail;
  }
}