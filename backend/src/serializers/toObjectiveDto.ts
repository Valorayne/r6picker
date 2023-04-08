import { ObjectiveDto } from "shared/objectives";
import { Objective } from "../entities/objective";

export function toObjectiveDto(objective: Objective): ObjectiveDto {
  switch (objective.type) {
    case "bomb":
      return {
        type: objective.type,
        id: objective.id,
        a: objective.a,
        b: objective.b
      }
    case "hostage":
    case "secureArea": {
      return {
        type: objective.type,
        id: objective.id,
        location: objective.location
      }
    }
  }
}