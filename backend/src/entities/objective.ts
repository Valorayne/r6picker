import { modelOptions, prop } from "@typegoose/typegoose";
import { ALL_OBJECTIVE_TYPES, ObjectiveType } from "shared/objectives";

class Position {
  @prop({ required: true })
  x!: number

  @prop({ required: true })
  y!: number
}

class Location {
  @prop({ required: true })
  layer!: number

  @prop({ required: true })
  position!: Position
}

@modelOptions({
  schemaOptions: {
    discriminatorKey: "type"
  }
})
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