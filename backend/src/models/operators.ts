import { OperatorDto, Team } from "shared/operators";
import { capitalize } from "lodash";
import { toOperatorDto } from "../serializers/toOperatorDto";
import { Operators } from "../entities/operatorEntity";

export async function getAllOperators(team: Team): Promise<OperatorDto[]> {
  const role = capitalize(team).slice(0, -1)
  const operators = await Operators.find({ role }).toArray()
  return operators?.map(operator => toOperatorDto(operator)) ?? []
}