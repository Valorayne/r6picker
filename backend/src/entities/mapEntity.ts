import { ALL_MAP_IDS, MapId } from "shared/maps";
import { Objective } from "./objective";
import { Dimensions, Position } from "./types";
import { registerCollection } from "./db";

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

export const Maps = registerCollection<MapEntity>({
  name: "maps",
  validator: {
    properties: {
      id: {
        type: "string",
        enum: ALL_MAP_IDS as unknown as string[]
      }
    }
  }
})
