import { MapDto, MapId } from "shared/types/maps";
import { ALL_MAPS } from "../data/map";

export async function getOneMap(id: MapId): Promise<MapDto> {
  return ALL_MAPS[id]
}