import { Schema, SchemaOptions } from "./index";
import { JSONSchema4 } from "json-schema";

type NumberSchemaProps = Partial<{
  minimum: number
  maximum: number
}>

export class NumberSchema<IsOptional extends boolean> extends Schema<NumberSchemaProps, IsOptional> {

  constructor(props: NumberSchemaProps, options: SchemaOptions<IsOptional>) {
    super(props, options)
  }

  public min(minimum: number): NumberSchema<IsOptional> {
    return new NumberSchema({
      ...this.props,
      minimum
    }, this.options)
  }

  public max(maximum: number): NumberSchema<IsOptional> {
    return new NumberSchema({
      ...this.props,
      maximum
    }, this.options)
  }

  public optional(): NumberSchema<true> {
    return new NumberSchema(this.props, {
      ...this.options,
      isOptional: true
    })
  }

  public toJsonSchema(): JSONSchema4 {
    return {
      type: "number",
      ...(this.props.minimum ? { minimum: this.props.minimum } : {}),
      ...(this.props.maximum ? { maximum: this.props.maximum } : {}),
      required: !this.options.isOptional
    }
  }
}