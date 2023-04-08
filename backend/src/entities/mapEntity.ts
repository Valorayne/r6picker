import { ALL_MAP_IDS } from "shared/types/maps";
import { ObjectiveSchema } from "./objective";
import { DimensionsSchema, PositionSchema } from "./types";
import { registerCollection } from "./db";
import { Schemas, TypeFromSchema } from "../../../shared/src/schemas/schemas";
import { WithoutId } from "mongodb";

export type Layer = TypeFromSchema<typeof LayerSchema>
const LayerSchema = Schemas.object({
  id: Schemas.number(),
  name: Schemas.string(),
  offset: PositionSchema.optional()
})

export type MapEntity = WithoutId<TypeFromSchema<typeof MapSchema>>
const MapSchema = Schemas.object({
  _id: Schemas.objectId(),
  id: Schemas.string().enum(...ALL_MAP_IDS),
  name: Schemas.string(),
  dimensions: DimensionsSchema,
  layers: Schemas.array(LayerSchema),
  objectives: Schemas.array(ObjectiveSchema)
})

export const Maps = registerCollection<MapEntity>({
  name: "maps",
  validator: MapSchema.toJsonSchema()
})
