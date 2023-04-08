import { ALL_MAP_IDS } from "shared/types/maps";
import { ObjectiveSchema } from "./objective";
import { registerCollection } from "./db";
import { Schemas, TypeFromSchema } from "shared/schemas";
import { ALL_ATTACKER_IDS, ALL_DEFENDER_IDS } from "shared/types/operators";

export type RoundResultEntity = TypeFromSchema<typeof RoundResultSchema>
export const RoundResultSchema = Schemas.object({
  _id: Schemas.objectId().optional(),
  map: Schemas.string().enum(...ALL_MAP_IDS),
  selected: Schemas.string(),
  teamMates: Schemas.array(Schemas.string().enum(...ALL_ATTACKER_IDS)),
  defenders: Schemas.array(Schemas.string().enum(...ALL_DEFENDER_IDS)),
  objective: ObjectiveSchema
})

export const RoundResults = registerCollection("roundResults", RoundResultSchema)