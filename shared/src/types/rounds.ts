import { ALL_MAP_IDS } from "./maps";
import { ALL_ATTACKER_IDS, ALL_DEFENDER_IDS } from "./operators";
import { Schemas, TypeFromSchema } from "../schemas";


const RoundDtoSchemaProperties = {
  mapId: Schemas.string().enum(...ALL_MAP_IDS),
  layerId: Schemas.number(),
  objectiveId: Schemas.number(),

  teamMates: Schemas.array(Schemas.string().enum(...ALL_ATTACKER_IDS)),
  defenders: Schemas.array(Schemas.string().enum(...ALL_DEFENDER_IDS)),
}
export type RoundDto = TypeFromSchema<typeof RoundDtoSchema>
export const RoundDtoSchema = Schemas.object(RoundDtoSchemaProperties)

export type RoundResultDto = TypeFromSchema<typeof RoundResultDtoSchema>
export const RoundResultDtoSchema = Schemas.object({
  ...RoundDtoSchemaProperties,
  selected: Schemas.string().enum(...ALL_ATTACKER_IDS)
})