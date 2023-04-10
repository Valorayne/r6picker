import { MapDto } from "shared/types"

export const BANK: MapDto = {
  id: "bank",
  name: "Bank",
  dimensions: {
    width: 2560,
    height: 1440
  },
  layers: [{
    id: 0,
    name: "Basement",
    offset: undefined,
    objectives: [{
      id: 0,
      type: "bomb",
      a: { x: 1208, y: 700 },
      b: { x: 1442, y: 720 }
    }]
  }, {
    id: 1,
    name: "1st Floor",
    offset: { x: 674, y: 178 },
    objectives: [{
      id: 0,
      type: "bomb",
      a: { x: 596, y: 497 },
      b: { x: 731, y: 422 }
    }, {
      id: 1,
      type: "bomb",
      a: { x: 696, y: 722 },
      b: { x: 861, y: 657 }
    }]
  }, {
    id: 2,
    name: "2nd Floor",
    offset: { x: 674, y: 178 },
    objectives: [{
      id: 0,
      type: "bomb",
      a: { x: 701, y: 407 },
      b: { x: 566, y: 472 }
    }]
  }, {
    id: 3,
    name: "Roof",
    offset: { x: 674, y: 178 },
    objectives: []
  }]
}