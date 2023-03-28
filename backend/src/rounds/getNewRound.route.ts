import { ServerRoute } from "@hapi/hapi"
import { createNewRound } from "./rounds"

const route: ServerRoute = {
  method: "GET",
  path: "/rounds/new",
  handler: () => createNewRound()
}

export default route