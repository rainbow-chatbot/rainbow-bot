import {Exception} from "./Exception";
import {Nothing} from "./Nothing";

export class Result<S> {
  success: S | null;
  fail: Exception | null;

  private constructor(success: S | null, fail: Exception | null) {
    this.success = success;
    this.fail = fail;
  }

  static fail = (error: Exception): Result<Nothing> => {
    return new Result(null, error);
  }

  static success = <T>(data: T): Result<T> => {
    return new Result(data, null);
  }
}