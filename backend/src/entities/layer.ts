import { prop } from "@typegoose/typegoose";

class Position {
  @prop({ required: true })
  public x!: number

  @prop({ required: true })
  public y!: number
}

export class Layer {
  @prop({ required: true })
  public id!: number

  @prop({ required: true })
  public name!: string

  @prop()
  public offset?: Position
}