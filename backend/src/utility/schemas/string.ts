import { Schema } from "./index";

export class StringSchema<T extends string, O extends boolean> implements Schema {

  constructor(
    private readonly validValues: readonly T[] | undefined,
    private readonly isOptional: O
  ) {
  }

  public optional(): StringSchema<T, true> {
    return new StringSchema<T, true>(this.validValues, true)
  }

  public valid<S extends string>(values: readonly S[]): StringSchema<S, O> {
    return new StringSchema<S, O>(values, this.isOptional)
  }
}