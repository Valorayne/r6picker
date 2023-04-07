import { MapId } from "shared/maps";
import { Objective } from "./objective";
import { Dimensions, Position } from "./types";
import { setupCollection } from "./db";

export type MapEntity = {
  id: MapId
  name: string
  dimensions: Dimensions
  layers: Layer[]
  objectives: Objective[]
}

export type Layer = {
  id: number
  name: string
  offset?: Position
}

export const Maps = setupCollection<MapEntity>({ name: "maps" })
