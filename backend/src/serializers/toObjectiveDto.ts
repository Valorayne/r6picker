import { LocationDto, ObjectiveDto } from "shared/objectives";
import { BombObjective, HostageObjective, Objective, SecureAreaObjective } from "../entities/objective";
import { DocumentType } from "@typegoose/typegoose";
import { Location, Position } from "../entities/types";
import { pick } from "lodash";
import { PositionDto } from "../../../shared/types";

export function toObjectiveDto(objective: Objective): ObjectiveDto {
  return {
    type: objective.type,
    id: (objective as DocumentType<Objective>).id,
    ...getSpecificPart(objective)
  } as ObjectiveDto
}

function getSpecificPart(objective: Objective) {
  switch (objective.type) {
    case "bomb":
      return {
        a: toLocationDto((objective as BombObjective).a),
        b: toLocationDto((objective as BombObjective).b),
      }
    case "secureArea":
      return { location: toLocationDto((objective as SecureAreaObjective).location) }
    case "hostage":
      return { location: toLocationDto((objective as HostageObjective).location) }
  }
}

function toLocationDto(location: Location): LocationDto {
  return {
    layer: location.layer,
    position: toPositionDto(location.position)
  }
}

function toPositionDto(position: Position): PositionDto {
  return pick(position, "x", "y")
}