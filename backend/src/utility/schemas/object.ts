import { Schema, SchemaOptions } from "./index";
import { JSONSchema4, JSONSchema4TypeName } from "json-schema";
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

  private readonly ALL_TYPES: JSONSchema4TypeName[] = ["string", "number", "boolean", "object", "array", "null"]

  toJsonSchema(): JSONSchema4 {
    const requiredProperties = Object.entries(this.props.properties)
      .filter(([, schema]) => !(schema as ObjectSchema<{}, boolean, boolean>).options.isOptional)
      .map(([key]) => key as string)
    return {
      type: ["object", ...(this.options.isOptional ? ["null" as JSONSchema4TypeName] : [])],
      properties: mapValues(this.props.properties, (schema) => schema.toJsonSchema()),
      ...(requiredProperties.length ? { required: requiredProperties } : {}),
      additionalProperties: this.props.additionalProperties ? { type: this.ALL_TYPES } : false
    }
  }
}