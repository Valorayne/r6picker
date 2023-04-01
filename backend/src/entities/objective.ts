import { modelOptions, prop } from "@typegoose/typegoose";
import { ALL_OBJECTIVE_TYPES, ObjectiveType } from "shared/objectives";
import { Location } from "./types";

@modelOptions({ schemaOptions: { discriminatorKey: "type" } })
export class Objective {
  @prop({ required: true, enum: ALL_OBJECTIVE_TYPES })
  public type!: ObjectiveType
}

export class BombObjective extends Objective {
  @prop({ required: true })
  public a!: Location

  @prop({ required: true })
  public b!: Location
}

export class HostageObjective extends Objective {
  @prop({ required: true })
  public location!: Location
}

export class SecureAreaObjective extends Objective {
  @prop({ required: true })
  public location!: Location
}

export const ObjectiveDiscriminators: { type: any, value: ObjectiveType }[] = [
  { type: BombObjective, value: "bomb" },
  { type: HostageObjective, value: "hostage" },
  { type: SecureAreaObjective, value: "secureArea" }
]