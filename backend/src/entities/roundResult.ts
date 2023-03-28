import { model, Schema } from "mongoose";
import { ALL_MAP_IDS } from "shared/maps";
import { ALL_ATTACKER_IDS, ALL_DEFENDER_IDS } from "shared/operators";

export const RoundResult = model('RoundResult', new Schema({
  map: { type: String, required: true, enum: ALL_MAP_IDS },
  teamMates: {
    type: [{ type: String, required: true, enum: ALL_ATTACKER_IDS }],
    validate: (array: string[]) => array.length <= 4
  },
  defenders: {
    type: [{ type: String, required: true, enum: ALL_DEFENDER_IDS }],
    validate: (array: string[]) => array.length <= 5
  },
  selected: { type: String, required: true, enum: ALL_ATTACKER_IDS }
}))