import { useQuery } from "vue-query";
import { CONSTANTS } from "@/constants";
import type { MapDto, MapId } from "shared/maps";
import type { Query } from "@/utility/types";

export function useMapQuery(mapId: MapId): Query<MapDto> {
  return useQuery(["maps", mapId],
    () => fetch(`${CONSTANTS.BASE_URL}/maps/${mapId}`).then(response => response.json())
  ) as Query<MapDto>
}