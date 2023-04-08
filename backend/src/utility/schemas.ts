import { StringSchema, StringSchemaProps } from "./schemas/string";
import { ObjectSchema, ObjectSchemaProps, PropertySchemas } from "./schemas/object";
import { Schema } from "./schemas/index"
import { NumberSchema, NumberSchemaProps } from "./schemas/number";
import { ArraySchema, ArraySchemaProps, ElementSchemas } from "./schemas/array";

export { Schema }

// TODO move into an Open Source NPM package
export namespace Schemas {

  export function object<T extends PropertySchemas<T>>(properties: T): ObjectSchema<T, false, false> {
    return new ObjectSchema({ properties, additionalProperties: false }, { isOptional: false })
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

type TypeFromSubSchema<T extends Schema<unknown, boolean>> = T extends Schema<infer P, boolean>
  ? (
    | (P extends StringSchemaProps<infer S> ? S : never)
    | (P extends NumberSchemaProps ? number : never)
    | (P extends ArraySchemaProps<infer S> ? TypeFromSchema<S>[] : never)

    | (
    P extends ObjectSchemaProps<infer S, infer A> ? (
      A extends true
        ? { [Key in keyof S]: TypeFromSchema<S[Key]> } & Record<string, unknown>
        : { [Key in keyof S]: TypeFromSchema<S[Key]> }
      ) : never)

    ) : never

export type TypeFromSchema<T extends Schema<unknown, boolean>> = T extends Schema<infer P, infer O> ?
  (O extends true ? TypeFromSubSchema<T> | undefined : TypeFromSubSchema<T>) : never
