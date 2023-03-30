import { Dimensions, Position } from "./types";

export type MapId = (typeof ALL_MAP_IDS)[number]
export const ALL_MAP_IDS = ["bank"] as const

export type MapDto = {
  id: MapId,
  name: string,
  dimensions: Dimensions
  layers: LayerDto[]
}

export type LayerDto = {
  id: number
  name: string
  offset?: Position
}