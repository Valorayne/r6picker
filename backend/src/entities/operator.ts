import { model, Schema } from "mongoose";
import { OperatorDto } from "shared/operators";
import { mapToObject } from "../utility/types";

export const Operator = model('Operator', new Schema({
  id: { type: String, required: true, index: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  svg: {
    required: true,
    type: new Schema({
      contents: { type: String, required: true },
      attributes: { type: Map, of: String, required: true }
    })
  },
}, {
  virtuals: {
    operatorDto: {
      get(): OperatorDto {
        return {
          id: this.id,
          name: this.name,
          svg: {
            contents: this.svg.contents,
            attributes: mapToObject(this.svg.attributes)
          }
        }
      }
    }
  }
}))