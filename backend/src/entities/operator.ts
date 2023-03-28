import { model, Schema } from "mongoose";

export const Operator = model('Operator', new Schema({
  id: { type: String, required: true, index: true },
  name: { type: String, required: true },
  svg: new Schema({
    contents: { type: String, required: true },
    attributes: { type: Map, of: String, required: true }
  }),
}))