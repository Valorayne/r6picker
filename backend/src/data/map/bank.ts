import { MapData } from "./index";

export const BANK: MapData = {
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
      a: { x: 1270, y: 675 },
      b: { x: 1405, y: 600 }
    }, {
      id: 1,
      type: "bomb",
      a: { x: 1370, y: 900 },
      b: { x: 1535, y: 835 }
    }]
  }, {
    id: 2,
    name: "2nd Floor",
    offset: { x: 674, y: 178 },
    objectives: [{
      id: 0,
      type: "bomb",
      a: { x: 1375, y: 585 },
      b: { x: 1240, y: 650 }
    }]
  }, {
    id: 3,
    name: "Roof",
    offset: { x: 674, y: 178 },
    objectives: []
  }]
}