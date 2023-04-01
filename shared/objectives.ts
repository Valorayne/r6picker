import { Position } from "./types";

export const ALL_OBJECTIVE_TYPES = ["bomb", "secureArea", "hostage"] as const
export type ObjectiveType = ObjectiveDto["type"]

export type ObjectiveDto = { id: string }
  & (BombObjectiveDto | SecureAreaObjectiveDto | HostageObjectiveDto)

export type BombObjectiveDto = {
  type: "bomb"
  a: LocationDto
  b: LocationDto
}

export type SecureAreaObjectiveDto = {
  type: "secureArea"
  location: LocationDto
}

export type HostageObjectiveDto = {
  type: "hostage"
  location: LocationDto
}

export type LocationDto = {
  layer: number
  position: Position
}