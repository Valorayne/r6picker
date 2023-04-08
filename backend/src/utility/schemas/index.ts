import { JSONSchema4 } from "json-schema";

export type SchemaOptions<IsOptional extends boolean> = {
  isOptional: IsOptional
}

export abstract class Schema<Props = unknown, IsOptional extends boolean = false> {

  protected constructor(
    protected readonly props: Props,
    protected readonly options: SchemaOptions<IsOptional>
  ) {
  }

  abstract toJsonSchema(): JSONSchema4

  public isOptional(): IsOptional {
    return this.options.isOptional
  }
}