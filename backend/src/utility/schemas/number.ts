import { Schema } from "./index";

export class NumberSchema<O extends boolean> implements Schema {

  constructor(
    private readonly minimum: number | undefined,
    private readonly maximum: number | undefined,
    private readonly isOptional: O
  ) {
  }

  public min(minimum: number): NumberSchema<O> {
    return new NumberSchema<O>(minimum, this.maximum, this.isOptional)
  }

  public max(maximum: number): NumberSchema<O> {
    return new NumberSchema<O>(this.minimum, maximum, this.isOptional)
  }

  public optional(): NumberSchema<true> {
    return new NumberSchema<true>(this.minimum, this.maximum, true)
  }
}