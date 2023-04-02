import { connect } from "mongoose"
import { Map, Maps } from "../entities/map";
import exportedMapData from "./data/maps.json"
import { Layer } from "../entities/layer";
import { Objective } from "../entities/objective";
import { Dimensions, Location, Position } from "../entities/types";
import { MapId } from "../../../shared/maps";

const connectionString = process.env.MONGO_ATLAS_CONNECTION ?? (() => {
  throw "Missing ENV var 'MONGO_ATLAS_CONNECTION'"
})()

async function execute() {
  await connect(connectionString)

  for (const mapData of exportedMapData) {
    const data = toMapEntityData(mapData)
    await Maps.updateOne({ id: data.id }, data, { upsert: true })
  }
}

function toMapEntityData(data: any): Map {
  return {
    id: data.id as MapId,
    name: data.name,
    dimensions: toDimensionsEntityData(data.dimensions),
    layers: data.layers.map(toLayerEntityData),
    objectives: data.objectives.map(toObjectiveEntityData)
  } as Map
}

function toDimensionsEntityData(data: any): Dimensions {
  return {
    width: toNumber(data.width),
    height: toNumber(data.height),
  }
}

function toLayerEntityData(data: any): Layer {
  return {
    id: toNumber(data.id),
    name: data.name,
    offset: data.offset ? toPositionEntityData(data.offset) : undefined
  } as Layer
}

function toObjectiveEntityData(data: any): Objective {
  return {
    type: data.type,
    a: data.a ? toLocationEntityData(data.a) : undefined,
    b: data.b ? toLocationEntityData(data.b) : undefined,
    location: data.location ? toLocationEntityData(data.location) : undefined,
  } as Objective
}

function toLocationEntityData(data: any): Location {
  return {
    layer: toNumber(data.layer),
    position: toPositionEntityData(data.position)
  }
}

function toPositionEntityData(data: any): Position {
  return {
    x: toNumber(data.x),
    y: toNumber(data.y),
  }
}

function toNumber(data: any): number {
  return +data["$numberInt"]
}

execute().then(() => {
  console.log("Update successful!")
  process.exit(0)
})