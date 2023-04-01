import { prop } from "@typegoose/typegoose";

export class Dimensions {
  @prop({ required: true })
  public width!: number

  @prop({ required: true })
  public height!: number
}

export class Position {
  @prop({ required: true })
  x!: number

  @prop({ required: true })
  y!: number
}

export class Location {
  @prop({ required: true })
  layer!: number

  @prop({ required: true })
  position!: Position
}