import { ServerRoute } from "@hapi/hapi"
import r6operators, { IOperator } from "r6operators"
import Joi from "joi"
import { get } from "lodash"

const operatorDetails: ServerRoute = {
  method: "GET",
  path: "/static/operators/{name}/{details?}",
  handler: (request, h) => {
    const operator = (r6operators as Record<string, IOperator>)[request.params.name]
    return request.params.details ? get(operator, request.params.details) : operator
  },
  options: {
    validate: {
      params: Joi.object({
        name: Joi.string().valid(...Object.keys(r6operators)),
        details: Joi.string().optional()
      })
    }
  }
}

export default operatorDetails