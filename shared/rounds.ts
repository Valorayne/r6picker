import { MapId } from "./maps";
import { AttackerId, DefenderId } from "./operators";

export type RoundDto = {
  map: MapId
  teamMates: AttackerId[]
  defenders: DefenderId[]
}

export type RoundResultDto = RoundDto & {
  selected: AttackerId
}