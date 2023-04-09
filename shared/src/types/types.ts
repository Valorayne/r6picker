import { Schemas, TypeFromSchema } from "../schemas";

export type PositionDto = TypeFromSchema<typeof PositionDtoSchema>
export const PositionDtoSchema = Schemas.object({
  x: Schemas.number(),
  y: Schemas.number()
})

export type DimensionsDto = TypeFromSchema<typeof DimensionsDtoSchema>
export const DimensionsDtoSchema = Schemas.object({
  width: Schemas.number(),
  height: Schemas.number()
})