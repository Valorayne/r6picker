import { StringSchema } from "./schemas/string";
import { ObjectSchema } from "./schemas/object";
import { Schema } from "./schemas/index"
import { NumberSchema } from "./schemas/number";

export { Schema }

export namespace Schemas {

  export function object<T extends Record<string, Schema> = Record<string, Schema>>(properties: T): ObjectSchema<T, false> {
    return new ObjectSchema<T, false>({ properties }, { isOptional: false })
  }

  export function string(): StringSchema<string, false> {
    return new StringSchema<string, false>({}, { isOptional: false })
  }

  export function number(): NumberSchema<false> {
    return new NumberSchema<false>({}, { isOptional: false })
  }
}

export type TypeFromSchema<T extends Schema<unknown, boolean>> =
  | (T extends StringSchema<infer S, infer O> ? (O extends true ? S | undefined : S) : never)
  | (T extends NumberSchema<infer O> ? (O extends true ? number | undefined : number) : never)

  | (T extends ObjectSchema<infer S, infer O> ? (
  O extends true
    ? { [Key in keyof S]: TypeFromSchema<S[Key]> }
    : { [Key in keyof S]: TypeFromSchema<S[Key]> } | undefined
  ) : never)