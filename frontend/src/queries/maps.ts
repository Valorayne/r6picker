import { useQuery } from "vue-query";
import { CONSTANTS } from "@/constants";
import type { MapDto, MapId } from "shared/maps";

export function useMapQuery(mapId: MapId) {
  return useQuery<MapDto[]>(["maps", mapId],
    () => fetch(`${CONSTANTS.BASE_URL}/maps/${mapId}`).then(response => response.json()))
}