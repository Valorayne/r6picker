import { RoundDto, RoundResultDto } from "shared/rounds";
import { ALL_ATTACKER_IDS, ALL_DEFENDER_IDS } from "shared/operators";
import { random } from "lodash";
import { RoundResults } from "../entities/roundResult";
import { drawRandom } from "../utility/random";
import { Map, Maps } from "../entities/map";
import { DocumentType } from "@typegoose/typegoose";
import { toObjectiveDto } from "../serializers/toObjectiveDto";

export async function createNewRound(): Promise<RoundDto> {
  const map: DocumentType<Map> = (await Maps.aggregate([{ $sample: { size: 1 } }]))[0]
  return {
    map: map.id,
    teamMates: drawRandom(ALL_ATTACKER_IDS, 4),
    defenders: drawRandom(ALL_DEFENDER_IDS, random(2, 5)),
    objective: toObjectiveDto(drawRandom(map.objectives, 1)[0])
  }
}

export async function storeRoundResult(result: RoundResultDto) {


  await RoundResults.create(result)
  return result
}