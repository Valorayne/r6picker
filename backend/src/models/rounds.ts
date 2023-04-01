import { RoundDto, RoundResultDto } from "shared/rounds";
import { ALL_ATTACKER_IDS, ALL_DEFENDER_IDS } from "shared/operators";
import { random } from "lodash";
import { RoundResults } from "../entities/roundResult";
import { drawRandom } from "../utility/random";
import { ALL_MAP_IDS } from "shared/maps";
import { Map, Maps } from "../entities/map";
import { DocumentType } from "@typegoose/typegoose";

export async function createNewRound(): Promise<RoundDto> {
  const mapId = drawRandom(ALL_MAP_IDS, 1)[0]
  const map: DocumentType<Map> = await Maps.findOne({ id: mapId })! as DocumentType<Map>
  const objectiveId = (drawRandom(map.objectives, 1)[0] as unknown as DocumentType<Map>).id
  return {
    map: mapId,
    teamMates: drawRandom(ALL_ATTACKER_IDS, 4),
    defenders: drawRandom(ALL_DEFENDER_IDS, random(2, 5)),
    objectiveId
  }
}

export async function storeRoundResult(result: RoundResultDto) {
  await RoundResults.create(result)
  return result
}