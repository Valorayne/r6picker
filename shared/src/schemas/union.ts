import { Schema, SchemaOptions } from "./index";
import { JSONSchema4 } from "json-schema";

export type ElementSchemas<T> = Schema<unknown, boolean>[]

export type UnionSchemaProps<T extends ElementSchemas<T>> = {
  subSchemas: [...T]
}

export class UnionSchema<T extends ElementSchemas<T>, IsOptional extends boolean> extends Schema<UnionSchemaProps<T>, IsOptional> {

  constructor(props: UnionSchemaProps<T>, options: SchemaOptions<IsOptional>) {
    super(props, options)
  }

  public optional(): UnionSchema<T, true> {
    return new UnionSchema(this.props, {
      ...this.options,
      isOptional: true
    })
  }

  public toJsonSchema(): JSONSchema4 {
    return {
      oneOf: this.props.subSchemas.map(schema => schema.toJsonSchema())
    }
  }
}