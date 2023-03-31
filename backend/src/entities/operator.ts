import { ALL_OPERATOR_IDS, OperatorId } from "shared/operators";
import { getModelForClass, prop } from "@typegoose/typegoose";

class OperatorSvg {
  @prop({ required: true })
  public contents!: string

  @prop({ required: true, type: () => String })
  public attributes!: Map<string, string>
}

export class Operator {
  @prop({ required: true, index: true, enum: ALL_OPERATOR_IDS })
  public id!: OperatorId

  @prop({ required: true })
  public name!: string

  @prop({ required: true })
  public role!: string

  @prop({ required: true })
  public svg!: OperatorSvg
}

export const Operators = getModelForClass(Operator)