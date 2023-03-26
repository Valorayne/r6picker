import r6operators from "r6operators";
import { pick } from "lodash";
import { OPERATOR_IDS_PER_TEAM, OperatorDto, Team } from "shared/operators";

export function getAllOperators(team: Team): OperatorDto[] {
  return OPERATOR_IDS_PER_TEAM[team].map(id => pick(r6operators[id], "id", "name", "svg"))
}

