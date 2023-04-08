import { Schema, SchemaOptions } from "./index";
import { JSONSchema4, JSONSchema4TypeName } from "json-schema";

export class ObjectIdSchema<O extends boolean> extends Schema<"ObjectId", O> {

  constructor(props: "ObjectId", options: SchemaOptions<O>) {
    super(props, options)
  }

  public optional(): ObjectIdSchema<true> {
    return new ObjectIdSchema(this.props, {
      ...this.options,
      isOptional: true
    })
  }

  toJsonSchema(): JSONSchema4 {
    return {
      bsonType: ["objectId", ...(this.options.isOptional ? ["null" as JSONSchema4TypeName] : [])],
    }
  }
}