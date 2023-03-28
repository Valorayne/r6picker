import { CONSTANTS } from "@/constants";
import { useQuery } from "vue-query";
import type { RoundDto, RoundResult } from "shared/rounds";

export function useNewRoundQuery() {
  return useQuery(['rounds', 'new'],
    () => fetch(`${CONSTANTS.BASE_URL}/rounds/new`).then<RoundDto>(response => response.json()), {
      refetchOnWindowFocus: false
    })
}

export function storeRoundResult(result: RoundResult) {
  return fetch(`${CONSTANTS.BASE_URL}/rounds/results`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(result)
  })
}