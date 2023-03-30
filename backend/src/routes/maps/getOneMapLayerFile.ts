import { ServerRoute } from "@hapi/hapi"
import * as Path from "path";
import Joi from "joi";
import { ALL_MAP_IDS } from "shared/maps";

const route: ServerRoute = {
  method: "GET",
  path: "/assets/maps/{mapId}/{layerId}",
  handler: {
    file: (request) => {
      const { mapId, layerId } = request.params
      return Path.join(__dirname, `../../../assets/maps/${mapId}/${mapId}-${layerId}.jpg`)
    }
  },
  options: {
    validate: {
      params: Joi.object({
        mapId: Joi.string().valid(...ALL_MAP_IDS).required(),
        layerId: Joi.number().required()
      })
    }
  }
}

export default route