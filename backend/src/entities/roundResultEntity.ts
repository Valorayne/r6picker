import { MapId } from "shared/maps";
import { Objective } from "./objective";
import { registerCollection } from "./db";

export type RoundResultEntity = {
  map: MapId
  selected: string
  teamMates: string[]
  defenders: string[]
  objective: Objective
}

export const RoundResults = registerCollection<RoundResultEntity>({ name: "roundResults" })