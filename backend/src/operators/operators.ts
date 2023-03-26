import r6operators, { Operator } from "r6operators";
import { OPERATOR_IDS_PER_TEAM, Team } from "./types";
import { pick } from "lodash";

const OVERVIEW_FIELDS = ["id", "name", "role", "svg"] as const
type OperatorOverviewEntry = Pick<Operator, typeof OVERVIEW_FIELDS[number]>

export function getAllOperators(team: Team): OperatorOverviewEntry[] {
  return OPERATOR_IDS_PER_TEAM[team].map(id => pick(r6operators[id], OVERVIEW_FIELDS))
}

