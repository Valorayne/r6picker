import { connect } from "mongoose"
import { Operator } from "../entities/operator";
import { omit, pick } from "lodash";
import r6operators from "r6operators";
import { OperatorId } from "../../../shared/operators";

const connectionString = process.env.MONGO_ATLAS_CONNECTION ?? (() => {
  throw "Missing ENV var 'MONGO_ATLAS_CONNECTION'"
})()

async function execute() {
  await connect(connectionString)

  let updated = 0
  let created = 0

  const entityFields = Object.keys(omit(Operator.schema.paths, "_id", "__v"))

  for (const id of Object.keys(r6operators)) {
    const data = pick(r6operators[id as OperatorId], entityFields)
    const existing = await Operator.findOne({ id })
    const result = await Operator.findOneAndUpdate({ id }, data, { upsert: true, returnDocument: "after" })
    if (!existing && result?.__v === 0) created++
    else if (existing && result?.__v !== existing.__v) updated++
  }

  return { updated, created }
}

execute().then(({ updated, created }) => {
  if (created) console.log(`${created} operators successfully created!`)
  if (updated) console.log(`${updated} operators successfully updated!`)
  if (!created && !updated) console.log("Everything up-to-date!")
  process.exit(0)
})