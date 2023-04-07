import { Schema } from "../../src/utility/schemas/index";
import { validate } from "json-schema";
import { expect } from "chai";

export function expectValue(value: any) {
  const toMatch = <O extends boolean>(schema: Schema<unknown, O>, success: boolean) => {
    const validation = validate(value, schema.toJsonSchema())
    expect(validation.valid).to.equal(success, JSON.stringify(validation.errors))
  }
  return {
    toMatch: <O extends boolean>(schema: Schema<unknown, O>) => toMatch<O>(schema, true),
    not: {
      toMatch: <O extends boolean>(schema: Schema<unknown, O>) => toMatch<O>(schema, false)
    }
  }
}