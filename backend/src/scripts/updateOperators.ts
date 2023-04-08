import { OperatorEntity, Operators } from "../entities/operatorEntity";
import { pick } from "lodash";
import r6operators from "r6operators";
import { OperatorId } from "../../../shared/operators";

async function execute() {
  const entityFields: (keyof OperatorEntity)[] = ["id", "name", "role", "svg"]

  for (const id of Object.keys(r6operators)) {
    const data = pick(r6operators[id as OperatorId], entityFields)
    await Operators.updateOne({ id: id as OperatorId }, data, { upsert: true })
  }
}

execute().then(() => {
  console.log("Update successful!")
  process.exit(0)
})