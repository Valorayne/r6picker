import { ALL_OPERATOR_IDS } from "shared/types/operators";
import { registerCollection } from "./db";
import { Schemas, TypeFromSchema } from "shared/schemas";

export type OperatorEntity = TypeFromSchema<typeof OperatorSchema>
const OperatorSchema = Schemas.object({
  id: Schemas.string().enum(...ALL_OPERATOR_IDS),
  name: Schemas.string(),
  role: Schemas.string(),
  svg: Schemas.object({
    contents: Schemas.string(),
    attributes: Schemas.object({}).additionalProperties()
  })
})

export const Operators = registerCollection("operators", OperatorSchema)