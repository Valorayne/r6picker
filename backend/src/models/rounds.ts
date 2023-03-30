import { RoundDto, RoundResultDto } from "shared/rounds";
import { ALL_ATTACKER_IDS, ALL_DEFENDER_IDS } from "shared/operators";
import { random } from "lodash";
import { RoundResult } from "../entities/roundResult";
import { drawRandom } from "../utility/random";
import { ALL_MAP_IDS } from "../../../shared/maps";

export function createNewRound(): RoundDto {
  return {
    map: drawRandom(ALL_MAP_IDS, 1)[0],
    teamMates: drawRandom(ALL_ATTACKER_IDS, 4),
    defenders: drawRandom(ALL_DEFENDER_IDS, random(2, 5))
  }
}

export async function storeRoundResult(result: RoundResultDto) {
  await new RoundResult(result).save()
  return result
}