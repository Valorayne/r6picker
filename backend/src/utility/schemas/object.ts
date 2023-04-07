import { Schema, SchemaOptions } from "./index";
import { JSONSchema4 } from "json-schema";
import { mapValues } from "lodash";

export type SubSchemas<T> = {
  [Key in keyof T]: T[Key] extends Schema<infer S, infer O> ? Schema<S, O> : never
}

type ObjectSchemaProps<T extends SubSchemas<T>> = {
  properties: T
}

export class ObjectSchema<T extends SubSchemas<T>, IsOptional extends boolean> extends Schema<ObjectSchemaProps<T>, IsOptional> {

  constructor(props: ObjectSchemaProps<T>, options: SchemaOptions<IsOptional>) {
    super(props, options)
  }

  public optional(): ObjectSchema<T, true> {
    return new ObjectSchema(this.props, {
      ...this.options,
      isOptional: true
    })
  }

  toJsonSchema(): JSONSchema4 {
    return {
      type: "object",
      properties: mapValues(this.props.properties, (schema) => schema.toJsonSchema()),
      required: !this.options.isOptional
    }
  }
}