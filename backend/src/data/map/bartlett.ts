import { MapData } from "./index";

export const BARTLETT: MapData = {
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
      a: { x: 1835, y: 603 },
      b: { x: 1870, y: 770 }
    }, {
      id: 1,
      type: "bomb",
      a: { x: 992, y: 710 },
      b: { x: 992, y: 880 }
    }]
  }, {
    id: 3,
    name: "Roof",
    offset: { x: 824, y: 250 },
    objectives: []
  }]
}