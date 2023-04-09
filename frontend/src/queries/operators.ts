import type { OperatorDto, Team } from "shared/types/operators";
import { useQuery } from "vue-query";
import { CONSTANTS } from "@/constants";
import type { Query, QueryParam } from "@/utility/types";
import { unwrap } from "@/utility/types";

export function useOperatorsQuery(team: QueryParam<Team>): Query<OperatorDto[], false> {
  return useQuery(["operators", team],
    () => fetch(`${CONSTANTS.BASE_URL}/operators/${unwrap(team)}`).then(response => response.json()),
    { placeholderData: [] }
  ) as Query<OperatorDto[], false>
}