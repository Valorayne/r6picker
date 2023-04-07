import { Layer, MapEntity, Maps } from "../entities/mapEntity";
import exportedMapData from "./data/maps.json"
import { Objective } from "../entities/objective";
import { Dimensions, Location, Position } from "../entities/types";
import { MapId } from "shared/maps";
import { ObjectId } from "mongodb";

async function execute() {
  for (const mapData of exportedMapData) {
    const data = toMapEntityData(mapData)
    await Maps.updateOne({ id: data.id }, { $set: data }, { upsert: true })
  }
}

function toMapEntityData(data: any): MapEntity {
  return {
    id: data.id as MapId,
    name: data.name,
    dimensions: toDimensionsEntityData(data.dimensions),
    layers: data.layers.map(toLayerEntityData),
    objectives: data.objectives.map(toObjectiveEntityData)
  } as MapEntity
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
  switch (data.type as Objective["type"]) {
    case "bomb": {
      return {
        type: "bomb",
        _id: new ObjectId(data._id.$oid),
        a: toLocationEntityData(data.a),
        b: toLocationEntityData(data.b)
      }
    }
    case "hostage":
    case "secureArea":
      return {
        type: data.type,
        _id: new ObjectId(data._id.$oid),
        location: toLocationEntityData(data.location),
      }
  }
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