import { LocationSchema } from "./types";
import { Schemas, TypeFromSchema } from "../utility/schemas";

const BombObjectiveSchema = Schemas.object({
  id: Schemas.string(),
  type: Schemas.string().enum("bomb"),
  a: LocationSchema,
  b: LocationSchema
})

const HostageObjectiveSchema = Schemas.object({
  id: Schemas.string(),
  type: Schemas.string().enum("hostage"),
  location: LocationSchema
})

const SecureAreaObjectiveSchema = Schemas.object({
  id: Schemas.string(),
  type: Schemas.string().enum("secureArea"),
  location: LocationSchema
})

export type Objective = TypeFromSchema<typeof ObjectiveSchema>
export const ObjectiveSchema = Schemas.union(
  BombObjectiveSchema,
  HostageObjectiveSchema,
  SecureAreaObjectiveSchema
)