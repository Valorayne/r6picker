import { ObjectiveDto } from "shared/objectives";
import { BombObjective, HostageObjective, Objective, SecureAreaObjective } from "../entities/objective";
import { DocumentType } from "@typegoose/typegoose";

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
        a: (objective as BombObjective).a,
        b: (objective as BombObjective).b,
      }
    case "secureArea":
      return { location: (objective as SecureAreaObjective).location }
    case "hostage":
      return { location: (objective as HostageObjective).location }
  }
}