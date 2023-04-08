import { LocationDtoSchema } from "./types";
import { Schemas, TypeFromSchema } from "../schemas";

export type BombObjectiveDto = TypeFromSchema<typeof BombObjectiveDtoSchema>
const BombObjectiveDtoSchema = Schemas.object({
  id: Schemas.string(),
  type: Schemas.string().enum("bomb"),
  a: LocationDtoSchema,
  b: LocationDtoSchema
})

export type SecureAreaObjectiveDto = TypeFromSchema<typeof SecureAreaObjectiveDtoSchema>
const SecureAreaObjectiveDtoSchema = Schemas.object({
  id: Schemas.string(),
  type: Schemas.string().enum("secureArea"),
  location: LocationDtoSchema
})

export type HostageObjectiveDto = TypeFromSchema<typeof HostageObjectiveDtoSchema>
const HostageObjectiveDtoSchema = Schemas.object({
  id: Schemas.string(),
  type: Schemas.string().enum("hostage"),
  location: LocationDtoSchema
})

export type ObjectiveDto = TypeFromSchema<typeof ObjectiveDtoSchema>
export const ObjectiveDtoSchema = Schemas.union(
  BombObjectiveDtoSchema,
  SecureAreaObjectiveDtoSchema,
  HostageObjectiveDtoSchema
)