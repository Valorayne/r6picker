import { RoundDto, RoundResultDto } from "shared/rounds";
import { ALL_ATTACKER_IDS, ALL_DEFENDER_IDS } from "shared/operators";
import { random } from "lodash";
import { RoundResults } from "../entities/roundResultEntity";
import { drawRandom } from "../utility/random";
import { MapEntity, Maps } from "../entities/mapEntity";
import { toObjectiveDto } from "../serializers/toObjectiveDto";

export async function createNewRound(): Promise<RoundDto> {
  const map = (await Maps.aggregate<MapEntity>([{ $sample: { size: 1 } }]).toArray())[0]
  return {
    map: map.id,
    teamMates: drawRandom(ALL_ATTACKER_IDS, 4),
    defenders: drawRandom(ALL_DEFENDER_IDS, random(2, 5)),
    objective: toObjectiveDto(drawRandom(map.objectives, 1)[0])
  }
}

export async function storeRoundResult(result: RoundResultDto) {
  await RoundResults.insertOne(result)
    .catch(error => console.log(error.errInfo.details.schemaRulesNotSatisfied))
  return result
}