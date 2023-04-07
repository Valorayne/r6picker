import { Schema, SchemaOptions } from "./index";
import { JSONSchema4 } from "json-schema";
import { mapValues } from "lodash";

type ObjectSchemaProps<T extends Record<string, Schema>> = {
  properties: T
}

export class ObjectSchema<T extends Record<string, Schema>, O extends boolean> extends Schema<ObjectSchemaProps<T>, O> {

  constructor(props: ObjectSchemaProps<T>, options: SchemaOptions<O>) {
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