import { ServerRoute } from "@hapi/hapi"
import r6operators, { IOperator } from "r6operators"
import Joi from "joi"
import { get } from "lodash"
import { ALL_OPERATOR_IDS } from "./operators"

const getOperatorDetails: ServerRoute = {
  method: "GET",
  path: "/static/operators/{name}/{details?}",
  handler: (request) => {
    const operator = (r6operators as Record<string, IOperator>)[request.params.name]
    return request.params.details ? get(operator, request.params.details) : operator
  },
  options: {
    validate: {
      params: Joi.object({
        name: Joi.string().valid(...ALL_OPERATOR_IDS),
        details: Joi.string().optional()
      })
    }
  }
}

export default getOperatorDetails