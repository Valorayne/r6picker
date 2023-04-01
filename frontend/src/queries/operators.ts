import type { OperatorDto, Team } from "shared/operators";
import { useQuery } from "vue-query";
import { CONSTANTS } from "@/constants";
import type { Query, QueryParam } from "@/utility/types";

export function useOperatorsQuery(team: QueryParam<Team>): Query<OperatorDto[], false> {
  return useQuery(["operators", team],
    () => fetch(`${CONSTANTS.BASE_URL}/operators/${team?.value ?? team}`).then(response => response.json()),
    { placeholderData: [] }
  ) as Query<OperatorDto[], false>
}