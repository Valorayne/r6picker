import { RoundDto, RoundResultDto } from "shared/rounds";
import { ALL_ATTACKER_IDS, ALL_DEFENDER_IDS } from "shared/operators";
import { random, shuffle, take } from "lodash";
import { RoundResult } from "../entities/roundResult";

export function createNewRound(): RoundDto {
  const teamMates = take(shuffle(ALL_ATTACKER_IDS), 4)

  const identifiedDefenderCount = random(2, 5)
  const defenders = take(shuffle(ALL_DEFENDER_IDS), identifiedDefenderCount)

  return {
    map: "bank",
    teamMates,
    defenders
  }
}

export async function storeRoundResult(result: RoundResultDto) {
  await new RoundResult(result).save()
  return result
}