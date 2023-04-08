import { Schema, SchemaOptions } from "./index";
import { JSONSchema4 } from "json-schema";
import { mapValues } from "lodash";

export type PropertySchemas<T> = {
  [Key in keyof T]: T[Key] extends Schema<infer S, infer O> ? Schema<S, O> : never
}

export type ObjectSchemaProps<T extends PropertySchemas<T>, A extends boolean> = {
  properties: T
  additionalProperties: A
}

export class ObjectSchema<T extends PropertySchemas<T>, IsOptional extends boolean, A extends boolean> extends Schema<ObjectSchemaProps<T, A>, IsOptional> {

  constructor(props: ObjectSchemaProps<T, A>, options: SchemaOptions<IsOptional>) {
    super(props, options)
  }

  public optional(): ObjectSchema<T, true, A> {
    return new ObjectSchema(this.props, {
      ...this.options,
      isOptional: true
    })
  }

  public additionalProperties(): ObjectSchema<T, IsOptional, true> {
    return new ObjectSchema({
      ...this.props,
      additionalProperties: true
    }, this.options)
  }

  toJsonSchema(): JSONSchema4 {
    return {
      type: "object",
      properties: mapValues(this.props.properties, (schema) => schema.toJsonSchema()),
      required: !this.options.isOptional,
      additionalProperties: this.props.additionalProperties ? { type: "any" } : false
    }
  }
}