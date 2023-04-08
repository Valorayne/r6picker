import { DimensionsSchema, PositionSchema } from "../../entities/types";
import { Schemas, TypeFromSchema } from "shared/schemas"
import { ALL_MAP_IDS, MapId } from "shared/types"
import { BANK } from "./bank";
import { BARTLETT } from "./bartlett";

const BombObjectiveDataSchema = Schemas.object({
  id: Schemas.number(),
  type: Schemas.string().enum("bomb"),
  a: PositionSchema,
  b: PositionSchema
})

const HostageObjectiveDataSchema = Schemas.object({
  id: Schemas.number(),
  type: Schemas.string().enum("hostage"),
  location: PositionSchema
})

const SecureAreaObjectiveDataSchema = Schemas.object({
  id: Schemas.number(),
  type: Schemas.string().enum("secureArea"),
  location: PositionSchema
})

const ObjectiveDataSchema = Schemas.union(
  BombObjectiveDataSchema,
  HostageObjectiveDataSchema,
  SecureAreaObjectiveDataSchema
)

const LayerDataSchema = Schemas.object({
  id: Schemas.number(),
  name: Schemas.string(),
  offset: PositionSchema.optional(),
  objectives: Schemas.array(ObjectiveDataSchema)
})

export type MapData = TypeFromSchema<typeof MapDataSchema>
const MapDataSchema = Schemas.object({
  id: Schemas.string().enum(...ALL_MAP_IDS),
  name: Schemas.string(),
  dimensions: DimensionsSchema,
  layers: Schemas.array(LayerDataSchema)
})

export const ALL_MAPS: Record<MapId, MapData> = {
  bank: BANK,
  bartlett: BARTLETT
}