import type { OperatorDto, Team } from "shared/operators";
import { useQuery } from "vue-query";
import { CONSTANTS } from "@/constants";
import type { Query, QueryParam } from "@/utility/types";
import { unwrap } from "@/utility/types";
import type { ObjectiveDto } from "shared/objectives";

export function useOperatorsQuery(team: QueryParam<Team>): Query<OperatorDto[], false> {
  return useQuery(["operators", team],
    () => fetch(`${CONSTANTS.BASE_URL}/operators/${unwrap(team)}`).then(response => response.json()),
    { placeholderData: [] }
  ) as Query<OperatorDto[], false>
}

export function findLayersWithObjectives(objective: ObjectiveDto) {
  return objective.type === "bomb"
    ? [objective.a.layer, objective.b.layer]
    : [objective.location.layer]
}