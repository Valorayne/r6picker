import { useQuery } from "vue-query";
import { CONSTANTS } from "@/constants";
import type { MapDto, MapId } from "shared/maps";
import type { Query, QueryParam } from "@/utility/types";
import { unwrap } from "@/utility/types";

export function useMapQuery(mapId: QueryParam<MapId>): Query<MapDto> {
  return useQuery(["maps", mapId],
    () => fetch(`${CONSTANTS.BASE_URL}/maps/${unwrap(mapId)}`).then(response => response.json())
  ) as Query<MapDto>
}