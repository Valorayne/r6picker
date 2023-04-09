import { ALL_MAP_IDS } from "shared/types/maps";
import { registerCollection } from "./db";
import { Schemas, TypeFromSchema } from "shared/schemas";
import { ALL_ATTACKER_IDS, ALL_DEFENDER_IDS } from "shared/types/operators";

export type RoundResultEntity = TypeFromSchema<typeof RoundResultEntitySchema>
export const RoundResultEntitySchema = Schemas.object({
  _id: Schemas.objectId().optional(),
  mapId: Schemas.string().enum(...ALL_MAP_IDS),
  layerId: Schemas.number(),
  objectiveId: Schemas.number(),

  selected: Schemas.string(),
  teamMates: Schemas.array(Schemas.string().enum(...ALL_ATTACKER_IDS)),
  defenders: Schemas.array(Schemas.string().enum(...ALL_DEFENDER_IDS)),
})

export const RoundResults = registerCollection("roundResults", RoundResultEntitySchema)