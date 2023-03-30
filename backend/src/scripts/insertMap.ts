import { connect } from "mongoose"
import { Map, Maps } from "../entities/map";

const connectionString = process.env.MONGO_ATLAS_CONNECTION ?? (() => {
  throw "Missing ENV var 'MONGO_ATLAS_CONNECTION'"
})()

async function execute() {
  await connect(connectionString)

  const offset = {
    x: 674,
    y: 178
  }
  const data: Map = {
    id: "bank",
    name: "Bank",
    dimensions: {
      width: 2560,
      height: 1440
    },
    layers: [{
      id: 0,
      name: "Basement"
    }, {
      id: 1,
      name: "1st Floor",
      offset
    }, {
      id: 2,
      name: "2nd Floor",
      offset
    }, {
      id: 3,
      name: "Roof",
      offset
    }]
  }

  await Maps.updateOne({ id: data.id }, data, { upsert: true })
}

execute().then(() => {
  console.log("Update successful!")
  process.exit(0)
})