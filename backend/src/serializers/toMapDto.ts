import { Map } from "../entities/map"
import { MapDto } from "shared/maps";
import { DocumentType } from "@typegoose/typegoose";
import { pick } from "lodash";
import { toObjectiveDto } from "./toObjectiveDto";

export function toMapDto(entity: DocumentType<Map>): MapDto {
  return {
    ...pick(entity, "id", "name", "dimensions"),
    layers: entity.layers.map(layer => pick(layer, "id", "name", "offset")),
    objectives: entity.objectives.map(toObjectiveDto)
  }
}