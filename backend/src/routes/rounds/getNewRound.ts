import { ServerRoute } from "@hapi/hapi"
import { createNewRound } from "../../models/rounds"

const route: ServerRoute = {
  method: "GET",
  path: "/rounds/new",
  handler: () => createNewRound()
}

export default route