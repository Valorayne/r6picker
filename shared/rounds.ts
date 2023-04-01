import type { MapId } from "./maps";
import type { AttackerId, DefenderId } from "./operators";

export type RoundDto = {
  map: MapId
  teamMates: AttackerId[]
  defenders: DefenderId[]
  objectiveId: string
}

export type RoundResultDto = Omit<RoundDto, "objectiveId"> & {
  selected: AttackerId
}