import { Map } from "../entities/map"
import { MapDto } from "shared/maps";
import { DocumentType } from "@typegoose/typegoose";
import { pick } from "lodash";

export function toMapDto(entity: DocumentType<Map>): MapDto {
  return {
    ...pick(entity, "id", "name", "dimensions"),
    layers: entity.layers.map(layer => pick(layer, "id", "name", "offset"))
  }
}