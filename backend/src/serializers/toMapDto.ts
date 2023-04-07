import { MapEntity } from "../entities/mapEntity"
import { MapDto } from "shared/maps";
import { pick } from "lodash";
import { WithId } from "mongodb";

export function toMapDto(entity: WithId<MapEntity>): MapDto {
  return {
    ...pick(entity, "id", "name", "dimensions"),
    layers: entity.layers.map(layer => pick(layer, "id", "name", "offset"))
  }
}