import { Schema } from "shared/schemas";
import { validate } from "jsonschema";
import { Boom } from "@hapi/boom";

export function validateBySchema<T extends Schema<unknown, boolean>>(schema: T) {
  return async (obj: unknown) => {
    const result = validate(obj, schema.toJsonSchema(), { required: !schema.isOptional() })
    if (result.valid)
      return obj
    else throw new Boom(JSON.stringify(result.errors))
  }
}