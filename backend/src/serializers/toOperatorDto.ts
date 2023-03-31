import { DocumentType } from "@typegoose/typegoose";
import { pick } from "lodash";
import { Operator } from "../entities/operator";
import { OperatorDto } from "shared/operators";
import { mapToObject } from "../utility/types";

export function toOperatorDto(entity: DocumentType<Operator>): OperatorDto {
  return {
    ...pick(entity, "id", "name", "role"),
    svg: {
      contents: entity.svg.contents,
      attributes: mapToObject(entity.svg.attributes)
    }
  }
}