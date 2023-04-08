import type { PositionDto } from "./types";

export type ObjectiveDto = BombObjectiveDto | SecureAreaObjectiveDto | HostageObjectiveDto

export type BombObjectiveDto = { id: string } & {
  type: "bomb"
  a: LocationDto
  b: LocationDto
}

export type SecureAreaObjectiveDto = { id: string } & {
  type: "secureArea"
  location: LocationDto
}

export type HostageObjectiveDto = { id: string } & {
  type: "hostage"
  location: LocationDto
}

export type LocationDto = {
  layer: number
  position: PositionDto
}