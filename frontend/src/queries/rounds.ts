import { CONSTANTS } from "@/constants";
import { useQuery } from "vue-query";
import type { RoundDto } from "shared/rounds";

export function useNewRoundQuery() {
  return useQuery(['rounds', 'new'],
    () => fetch(`${CONSTANTS.BASE_URL}/rounds/new`).then<RoundDto>(response => response.json()), {
      refetchOnWindowFocus: false
    })
}