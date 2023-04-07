import { Schema } from "./index";

export class ObjectSchema<T extends Record<string, Schema>, O extends boolean> implements Schema {

  constructor(
    private readonly properties: T | undefined,
    // @ts-ignore
    private readonly isOptional: O
  ) {

  }

  public optional(): ObjectSchema<T, true> {
    return new ObjectSchema<T, true>(this.properties, true)
  }
}