import { DimensionsDtoSchema, PositionDtoSchema } from "./types";
import { Schemas, TypeFromSchema } from "../schemas/schemas";

export type MapId = (typeof ALL_MAP_IDS)[number]
export const ALL_MAP_IDS = ["bank", "bartlett"] as const

export type LayerDto = TypeFromSchema<typeof LayerDtoSchema>
export const LayerDtoSchema = Schemas.object({
  id: Schemas.number(),
  name: Schemas.string(),
  offset: PositionDtoSchema.optional()
})

export type MapDto = TypeFromSchema<typeof MapDtoSchema>
export const MapDtoSchema = Schemas.object({
  id: Schemas.string().enum(...ALL_MAP_IDS),
  name: Schemas.string(),
  dimensions: DimensionsDtoSchema,
  layers: Schemas.array(LayerDtoSchema)
})