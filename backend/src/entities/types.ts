import { Schemas, TypeFromSchema } from "../utility/schemas";

export type Dimensions = TypeFromSchema<typeof DimensionsSchema>
export const DimensionsSchema = Schemas.object({
  width: Schemas.number(),
  height: Schemas.number()
})

export type Position = TypeFromSchema<typeof PositionSchema>
export const PositionSchema = Schemas.object({
  x: Schemas.number(),
  y: Schemas.number(),
})

export type Location = TypeFromSchema<typeof LocationSchema>
export const LocationSchema = Schemas.object({
  layer: Schemas.number(),
  position: PositionSchema
})