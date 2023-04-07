import { MapId } from "shared/maps";
import { Objective } from "./objective";
import { setupCollection } from "./db";

export type RoundResultEntity = {
  map: MapId
  selected: string
  teamMates: string[]
  defenders: string[]
  objective: Objective
}

export const RoundResults = setupCollection<RoundResultEntity>({ name: "roundResults" })