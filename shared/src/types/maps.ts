import type { DimensionsDto, PositionDto } from "./types";

export type MapId = (typeof ALL_MAP_IDS)[number]
export const ALL_MAP_IDS = ["bank", "bartlett"] as const

export type MapDto = {
  id: MapId,
  name: string,
  dimensions: DimensionsDto
  layers: LayerDto[]
}

export type LayerDto = {
  id: number
  name: string
  offset?: PositionDto
}