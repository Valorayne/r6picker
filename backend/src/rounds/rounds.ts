import { RoundDto, RoundResultDto } from "shared/rounds";
import { ALL_ATTACKER_IDS, ALL_DEFENDER_IDS } from "../../../shared/operators";
import { random, shuffle, take } from "lodash";
import { model, Schema } from "mongoose"
import { ALL_MAP_IDS } from "shared/maps";

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

const RoundResultModel = model<RoundResultDto>('RoundResult', new Schema<RoundResultDto>({
  map: { type: String, required: true, enum: ALL_MAP_IDS },
  teamMates: {
    type: [{ type: String, required: true, enum: ALL_ATTACKER_IDS }],
    validate: (array: string[]) => array.length <= 4
  },
  defenders: {
    type: [{ type: String, required: true, enum: ALL_DEFENDER_IDS }],
    validate: (array: string[]) => array.length <= 5
  },
  selected: { type: String, required: true, enum: ALL_ATTACKER_IDS }
}))

export async function storeRoundResult(result: RoundResultDto) {
  await new RoundResultModel(result).save()
  return result
}