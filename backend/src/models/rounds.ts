import {
  ALL_ATTACKER_IDS,
  ALL_DEFENDER_IDS,
  ALL_MAP_IDS,
  LayerDto,
  MapDto,
  ObjectiveDto,
  RoundDto,
  RoundResultDto
} from "shared/types";
import { flatMap, random } from "lodash";
import { RoundResults } from "../entities/roundResultEntity";
import { drawRandom } from "../utility/random";
import { ALL_MAPS } from "../data/map";

export async function createNewRound(): Promise<RoundDto> {
  const mapId = drawRandom(ALL_MAP_IDS, 1)[0]
  const objective = drawRandomObjective(ALL_MAPS[mapId])
  return {
    mapId,
    layerId: objective.layerId,
    objectiveId: objective.objectiveId,
    teamMates: drawRandom(ALL_ATTACKER_IDS, 4),
    defenders: drawRandom(ALL_DEFENDER_IDS, random(2, 5))
  }
}

type ObjectivePointer = Pick<RoundDto, "layerId" | "objectiveId">

function drawRandomObjective(map: MapDto): ObjectivePointer {
  const allObjectives: ObjectivePointer[] = flatMap(map.layers,
    (layer: LayerDto) => layer.objectives.map((objective: ObjectiveDto) => ({
      layerId: layer.id,
      objectiveId: objective.id
    })))
  return drawRandom(allObjectives, 1)[0]
}

export async function storeRoundResult(result: RoundResultDto) {
  await RoundResults.insertOne({ ...result, _id: undefined }).catch(console.error)
  return result
}