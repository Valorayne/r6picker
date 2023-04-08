import { pick } from "lodash";
import { OperatorEntity } from "../entities/operatorEntity";
import { OperatorDto } from "shared/types/operators";
import { WithId } from "mongodb";

export function toOperatorDto(entity: WithId<OperatorEntity>): OperatorDto {
  return pick(entity, "id", "name", "role", "svg")
}