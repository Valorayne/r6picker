import { Schemas, TypeFromSchema } from "../schemas/schemas";

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

export type LocationDto = TypeFromSchema<typeof LocationDtoSchema>
export const LocationDtoSchema = Schemas.object({
  layer: Schemas.number(),
  position: PositionDtoSchema
})