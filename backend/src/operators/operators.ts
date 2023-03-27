import r6operators from "r6operators";
import { OPERATOR_IDS_PER_TEAM, OperatorDto, OperatorId, Team } from "shared/operators";
import { pick } from "lodash";

export function getAllOperators(team: Team): OperatorDto[] {
  return OPERATOR_IDS_PER_TEAM[team]
    .map(id => r6operators[id])
    .map(({ id, ...rest }) => ({
      id: id as OperatorId,
      ...pick(rest, "name", "svg")
    }))
}

