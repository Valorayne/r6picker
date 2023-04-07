import { Location } from "./types";
import { WithId } from "mongodb";

export type Objective = WithId<BombObjective | HostageObjective | SecureAreaObjective>

type BombObjective = {
  type: "bomb"
  a: Location
  b: Location
}

type HostageObjective = {
  type: "hostage"
  location: Location
}

type SecureAreaObjective = {
  type: "secureArea"
  location: Location
}