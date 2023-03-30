import { ServerRoute } from "@hapi/hapi"
import { getAllOperators } from "../../models/operators"
import Joi from "joi";
import { ALL_TEAMS } from "shared/operators";

const route: ServerRoute = {
  method: "GET",
  path: "/operators/{team}",
  handler: (request) => getAllOperators(request.params.team),
  options: {
    validate: {
      params: Joi.object({
        team: Joi.string().valid(...ALL_TEAMS)
      })
    }
  }
}

export default route