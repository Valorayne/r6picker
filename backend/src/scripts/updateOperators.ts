import { connect } from "mongoose"
import { Operator, Operators } from "../entities/operator";
import { omit, pick } from "lodash";
import r6operators from "r6operators";
import { OperatorId } from "../../../shared/operators";

const connectionString = process.env.MONGO_ATLAS_CONNECTION ?? (() => {
  throw "Missing ENV var 'MONGO_ATLAS_CONNECTION'"
})()

async function execute() {
  await connect(connectionString)
  const entityFields = Object.keys(omit(Object.keys(new Operator()), "_id", "__v"))

  for (const id of Object.keys(r6operators)) {
    const data = pick(r6operators[id as OperatorId], entityFields)
    await Operators.updateOne({ id }, data, { upsert: true })
  }
}

execute().then(() => {
  console.log("Update successful!")
  process.exit(0)
})