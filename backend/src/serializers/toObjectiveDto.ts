import { ObjectiveDto } from "shared/objectives";
import { BombObjective, HostageObjective, Objective, SecureAreaObjective } from "../entities/objective";
import { DocumentType } from "@typegoose/typegoose";

export function toObjectiveDto(objective: Objective): ObjectiveDto {
  switch (objective.type) {
    case "secureArea":
      return {
        type: "hostage",
        id: (objective as DocumentType<Objective>).id,
        location: (objective as SecureAreaObjective).location,
      }
    case "bomb":
      return {
        type: "bomb",
        id: (objective as DocumentType<Objective>).id,
        a: (objective as BombObjective).a,
        b: (objective as BombObjective).b,
      }
    case "hostage":
      return {
        type: "hostage",
        id: (objective as DocumentType<Objective>).id,
        location: (objective as HostageObjective).location,
      }
  }
}