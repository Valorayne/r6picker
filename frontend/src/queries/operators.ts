import type { OperatorDto, Team } from "shared/operators";
import { useQuery } from "vue-query";
import { CONSTANTS } from "@/constants";
import type { Query } from "@/utility/types";

export function useOperatorsQuery(team: Team): Query<OperatorDto[], false> {
  return useQuery(["operators", team],
    () => fetch(`${CONSTANTS.BASE_URL}/operators/${team}`).then(response => response.json()),
    { placeholderData: [] }
  ) as Query<OperatorDto[], false>
}