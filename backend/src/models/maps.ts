import { MapDto, MapId } from "shared/maps";
import { Map, Maps } from "../entities/map";
import { toMapDto } from "../serializers/toMapDto";
import { Boom } from "@hapi/boom";
import { DocumentType } from "@typegoose/typegoose";

export async function getOneMap(id: MapId): Promise<MapDto | Boom> {
  const map = await Maps.findOne({ id })
  if (!map) return new Boom(`Map with id '${id}' not found`, { statusCode: 404 })
  return toMapDto(map as DocumentType<Map>)
}