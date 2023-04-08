import { Schema, SchemaOptions } from "./index";
import { JSONSchema4, JSONSchema4TypeName } from "json-schema";

export type ElementSchemas<T> = Schema<unknown, boolean>

export type ArraySchemaProps<T extends ElementSchemas<T>> = {
  subSchema: T
}

export class ArraySchema<T extends ElementSchemas<T>, IsOptional extends boolean> extends Schema<ArraySchemaProps<T>, IsOptional> {

  constructor(props: ArraySchemaProps<T>, options: SchemaOptions<IsOptional>) {
    super(props, options)
  }

  public optional(): ArraySchema<T, true> {
    return new ArraySchema(this.props, {
      ...this.options,
      isOptional: true
    })
  }

  public toJsonSchema(): JSONSchema4 {
    return {
      type: ["array", ...(this.options.isOptional ? ["null" as JSONSchema4TypeName] : [])],
      items: this.props.subSchema.toJsonSchema()
    }
  }
}