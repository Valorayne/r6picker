import { ServerRoute } from "@hapi/hapi";
import Joi from "joi";
import { ALL_MAP_IDS } from "shared/types/maps";
import { getOneMap } from "../../models/maps";

const route: ServerRoute = {
  method: "GET",
  path: "/maps/{mapId}",
  handler: (request) => getOneMap(request.params.mapId),
  options: {
    validate: {
      params: Joi.object({
        mapId: Joi.string().valid(...ALL_MAP_IDS).required()
      })
    }
  }
}

export default route