import { OperatorId } from "shared/operators";
import { registerCollection } from "./db";

export type OperatorEntity = {
  id: OperatorId
  name: string
  role: string
  svg: {
    contents: string
    attributes: Record<string, string>
  }
}

export const Operators = registerCollection<OperatorEntity>({ name: "operators" })