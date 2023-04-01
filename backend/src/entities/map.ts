import { getModelForClass, prop } from "@typegoose/typegoose";
import { Layer } from "./layer";
import { ALL_MAP_IDS, MapId } from "shared/maps";
import { Objective, ObjectiveDiscriminators } from "./objective";

class Dimensions {
  @prop({ required: true })
  public width!: number

  @prop({ required: true })
  public height!: number
}

export class Map {
  @prop({ required: true, enum: ALL_MAP_IDS })
  public id!: MapId

  @prop({ required: true })
  public name!: string

  @prop({ required: true })
  public dimensions!: Dimensions

  @prop({ required: true, type: () => [Layer] })
  public layers!: Layer[]

  @prop({ required: true, type: () => Objective, discriminators: () => ObjectiveDiscriminators })
  public objectives!: Objective[]
}

export const Maps = getModelForClass(Map)