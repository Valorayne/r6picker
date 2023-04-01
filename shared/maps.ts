import { Dimensions, Position } from "./types";
import { ObjectiveDto } from "./objectives";

export type MapId = (typeof ALL_MAP_IDS)[number]
export const ALL_MAP_IDS = ["bank", "bartlett"] as const

export type MapDto = {
  id: MapId,
  name: string,
  dimensions: Dimensions
  layers: LayerDto[]
  objectives: ObjectiveDto[]
}

export type LayerDto = {
  id: number
  name: string
  offset?: Position
}