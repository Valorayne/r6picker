import { StringSchema } from "./schemas/string";
import { ObjectSchema, PropertySchemas } from "./schemas/object";
import { Schema } from "./schemas/index"
import { NumberSchema } from "./schemas/number";
import { ArraySchema, ElementSchemas } from "./schemas/array";

export { Schema }

export namespace Schemas {

  export function object<T extends PropertySchemas<T>>(properties: T): ObjectSchema<T, false> {
    return new ObjectSchema({ properties }, { isOptional: false })
  }

  export function array<T extends ElementSchemas<T>>(subSchema: T): ArraySchema<T, false> {
    return new ArraySchema({ subSchema }, { isOptional: false })
  }

  export function string(): StringSchema<string, false> {
    return new StringSchema({}, { isOptional: false })
  }

  export function number(): NumberSchema<false> {
    return new NumberSchema({}, { isOptional: false })
  }
}

export type TypeFromSchema<T extends Schema<unknown, boolean>> =
  | (T extends StringSchema<infer S, infer O> ? (O extends true ? S | undefined : S) : never)
  | (T extends NumberSchema<infer O> ? (O extends true ? number | undefined : number) : never)

  | (T extends ArraySchema<infer S, infer O> ? (
  O extends true
    ? TypeFromSchema<S>[] | undefined
    : TypeFromSchema<S>[]
  ) : never)
  
  | (T extends ObjectSchema<infer S, infer O> ? (
  O extends true
    ? { [Key in keyof S]: TypeFromSchema<S[Key]> } | undefined
    : { [Key in keyof S]: TypeFromSchema<S[Key]> }
  ) : never)

