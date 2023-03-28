import { OperatorDto, Team } from "shared/operators";
import { capitalize } from "lodash";
import { Operator } from "../entities/operator";

export async function getAllOperators(team: Team): Promise<OperatorDto[]> {
  const role = capitalize(team).slice(0, -1)
  const operators = await Operator.find({ role })
  return operators?.map(operator => operator.operatorDto) ?? []
}