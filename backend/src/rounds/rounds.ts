import { RoundDto, RoundResult } from "shared/rounds";
import { ALL_ATTACKER_IDS, ALL_DEFENDER_IDS } from "../../../shared/operators";
import { random, shuffle, take } from "lodash";

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

export async function storeRoundResult(result: RoundResult) {
  console.log(result)
  return 200
}