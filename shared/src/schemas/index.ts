import { StringSchema } from "./string";
import { ObjectSchema, PropertySchemas } from "./object";
import { Schema } from "./schema"
import { NumberSchema } from "./number";
import { ArraySchema, ElementSchemas } from "./array";
import { UnionSchema } from "./union";
import { ObjectIdSchema } from "./objectId";
import { TypeFromSchema } from "./types";

export { Schema, TypeFromSchema }

// TODO move into an Open Source NPM package
export namespace Schemas {

  export function object<T extends PropertySchemas<T>>(properties: T): ObjectSchema<T, false, false> {
    return new ObjectSchema({ properties, additionalProperties: false }, { isOptional: false })
  }

  export function objectId(): ObjectIdSchema<false> {
    return new ObjectIdSchema("ObjectId", { isOptional: false })
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

  export function union<T extends Schema<unknown, boolean>[]>(...subSchemas: [...T]): UnionSchema<T, false> {
    return new UnionSchema({ subSchemas }, { isOptional: false })
  }
}