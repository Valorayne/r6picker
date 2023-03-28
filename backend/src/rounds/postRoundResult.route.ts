import { ServerRoute } from "@hapi/hapi"
import Joi from "joi";
import { ALL_MAP_IDS } from "shared/maps";
import { storeRoundResult } from "./rounds";
import { ALL_ATTACKER_IDS, ALL_DEFENDER_IDS } from "shared/operators";
import { RoundResult } from "shared/rounds";

const route: ServerRoute = {
  method: "POST",
  path: "/rounds/results",
  handler: (request) => storeRoundResult(request.payload as RoundResult),
  options: {
    validate: {
      payload: Joi.object({
        map: Joi.string().valid(...ALL_MAP_IDS),
        teamMates: Joi.array().items(Joi.string().valid(...ALL_ATTACKER_IDS)),
        defenders: Joi.array().items(Joi.string().valid(...ALL_DEFENDER_IDS)),
        selected: Joi.string().valid(...ALL_ATTACKER_IDS)
      })
    }
  }
}

export default route