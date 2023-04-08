import { ALL_MAP_IDS } from "./maps";
import { ALL_ATTACKER_IDS, ALL_DEFENDER_IDS } from "./operators";
import { ObjectiveDtoSchema } from "./objectives";
import { Schemas, TypeFromSchema } from "../schemas";

const RoundDtoSchemaProperties = {
  map: Schemas.string().enum(...ALL_MAP_IDS),
  teamMates: Schemas.array(Schemas.string().enum(...ALL_ATTACKER_IDS)),
  defenders: Schemas.array(Schemas.string().enum(...ALL_DEFENDER_IDS)),
  objective: ObjectiveDtoSchema
}
export type RoundDto = TypeFromSchema<typeof RoundDtoSchema>
export const RoundDtoSchema = Schemas.object(RoundDtoSchemaProperties)

export type RoundResultDto = TypeFromSchema<typeof RoundResultDtoSchema>
export const RoundResultDtoSchema = Schemas.object({
  ...RoundDtoSchemaProperties,
  selected: Schemas.string().enum(...ALL_ATTACKER_IDS)
})