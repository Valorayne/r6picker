import { MapDto } from "shared/types"

export const BARTLETT: MapDto = {
  id: "bartlett",
  name: "Bartlett University",
  dimensions: {
    width: 2560,
    height: 1440
  },
  layers: [{
    id: 1,
    name: "1st Floor",
    offset: undefined,
    objectives: [{
      id: 0,
      type: "bomb",
      a: { x: 992, y: 650 },
      b: { x: 992, y: 900 }
    }, {
      id: 1,
      type: "bomb",
      a: { x: 1825, y: 800 },
      b: { x: 1840, y: 500 }
    }]
  }, {
    id: 2,
    name: "2nd Floor",
    offset: { x: 824, y: 250 },
    objectives: [{
      id: 0,
      type: "bomb",
      a: { x: 1011, y: 353 },
      b: { x: 1046, y: 520 }
    }, {
      id: 1,
      type: "bomb",
      a: { x: 168, y: 460 },
      b: { x: 168, y: 630 }
    }]
  }, {
    id: 3,
    name: "Roof",
    offset: { x: 824, y: 250 },
    objectives: []
  }]
}