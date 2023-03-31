import { CONSTANTS } from "@/constants";
import { useMutation, useQuery } from "vue-query";
import type { RoundDto, RoundResultDto } from "shared/rounds";
import type { Query } from "@/utility/types";

export function useNewRoundQuery(): Query<RoundDto> {
  return useQuery(['rounds', 'new'],
    () => fetch(`${CONSTANTS.BASE_URL}/rounds/new`).then(response => response.json()),
    { refetchOnWindowFocus: false }
  ) as Query<RoundDto>
}

export function useStoreRoundResultMutation() {
  return useMutation<Response, Error, RoundResultDto>((result: RoundResultDto) => fetch(`${CONSTANTS.BASE_URL}/rounds/results`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(result)
  }))
}