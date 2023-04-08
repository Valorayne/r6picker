import { Schema, SchemaOptions } from "./schema";
import { JSONSchema4, JSONSchema4TypeName } from "json-schema";

export type StringSchemaProps<T> = Partial<{
  validValues: readonly T[]
}>

export class StringSchema<T extends string, O extends boolean> extends Schema<StringSchemaProps<T>, O> {

  constructor(props: StringSchemaProps<T>, options: SchemaOptions<O>) {
    super(props, options)
  }

  public optional(): StringSchema<T, true> {
    return new StringSchema(this.props, {
      ...this.options,
      isOptional: true
    })
  }

  public enum<S extends string>(...values: readonly S[]): StringSchema<S, O> {
    return new StringSchema({
      ...this.props,
      validValues: values
    }, this.options)
  }

  public toJsonSchema(): JSONSchema4 {
    return {
      type: ["string", ...(this.options.isOptional ? ["null" as JSONSchema4TypeName] : [])],
      ...(this.props.validValues ? { enum: this.props.validValues as unknown as string[] } : {}),
    }
  }
}