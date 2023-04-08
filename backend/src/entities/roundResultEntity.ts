import { ALL_MAP_IDS } from "shared/maps";
import { ObjectiveSchema } from "./objective";
import { registerCollection } from "./db";
import { Schemas, TypeFromSchema } from "../utility/schemas";
import { ALL_ATTACKER_IDS, ALL_DEFENDER_IDS } from "../../../shared/operators";
import { WithoutId } from "mongodb";

export type RoundResultEntity = WithoutId<TypeFromSchema<typeof RoundResultSchema>>
const RoundResultSchema = Schemas.object({
  _id: Schemas.objectId().optional(),
  map: Schemas.string().enum(...ALL_MAP_IDS),
  selected: Schemas.string(),
  teamMates: Schemas.array(Schemas.string().enum(...ALL_ATTACKER_IDS)),
  defenders: Schemas.array(Schemas.string().enum(...ALL_DEFENDER_IDS)),
  objective: ObjectiveSchema
})

export const RoundResults = registerCollection<RoundResultEntity>({
  name: "roundResults",
  validator: RoundResultSchema.toJsonSchema()
})