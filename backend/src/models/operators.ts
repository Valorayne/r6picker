import { OperatorDto, Team } from "shared/operators";
import { capitalize } from "lodash";
import { Operators } from "../entities/operator";
import { toOperatorDto } from "../serializers/toOperatorDto";

export async function getAllOperators(team: Team): Promise<OperatorDto[]> {
  const role = capitalize(team).slice(0, -1)
  const operators = await Operators.find({ role })
  return operators?.map(operator => toOperatorDto(operator)) ?? []
}