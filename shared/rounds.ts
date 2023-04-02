import type { MapId } from "./maps";
import type { AttackerId, DefenderId } from "./operators";
import { ObjectiveDto } from "./objectives";

export type RoundDto = {
  map: MapId
  teamMates: AttackerId[]
  defenders: DefenderId[]
  objective: ObjectiveDto
}

export type RoundResultDto = RoundDto & {
  selected: AttackerId
}