import { PositionDtoSchema } from "./types";
import { Schemas, TypeFromSchema } from "../schemas";

const BombObjectiveDtoSchema = Schemas.object({
  id: Schemas.number(),
  type: Schemas.string().enum("bomb"),
  a: PositionDtoSchema,
  b: PositionDtoSchema
})

const SecureAreaObjectiveDtoSchema = Schemas.object({
  id: Schemas.number(),
  type: Schemas.string().enum("secureArea"),
  position: PositionDtoSchema
})

const HostageObjectiveDtoSchema = Schemas.object({
  id: Schemas.number(),
  type: Schemas.string().enum("hostage"),
  position: PositionDtoSchema
})

export type ObjectiveDto = TypeFromSchema<typeof ObjectiveDtoSchema>
export const ObjectiveDtoSchema = Schemas.union(
  BombObjectiveDtoSchema,
  SecureAreaObjectiveDtoSchema,
  HostageObjectiveDtoSchema
)