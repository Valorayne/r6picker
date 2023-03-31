import { ALL_MAP_IDS, MapId } from "shared/maps";
import { ALL_ATTACKER_IDS, ALL_DEFENDER_IDS } from "shared/operators";
import { getModelForClass, prop } from "@typegoose/typegoose";

export class RoundResult {
  @prop({ required: true, index: true, enum: ALL_MAP_IDS })
  map!: MapId

  @prop({ required: true, enum: ALL_ATTACKER_IDS })
  selected!: string

  @prop({
    required: true,
    type: () => String,
    validate: (array: string[]) => array.length <= 4,
    enum: ALL_ATTACKER_IDS
  })
  teamMates!: string[]

  @prop({
    required: true,
    type: () => String,
    validate: (array: string[]) => array.length <= 5,
    enum: ALL_DEFENDER_IDS
  })
  defenders!: string[]
}

export const RoundResults = getModelForClass(RoundResult)