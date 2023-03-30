import { ServerRoute } from "@hapi/hapi"
import Joi from "joi";
import { ALL_MAP_IDS } from "shared/maps";
import { storeRoundResult } from "../../models/rounds";
import { ALL_ATTACKER_IDS, ALL_DEFENDER_IDS } from "shared/operators";
import { RoundResultDto } from "shared/rounds";

const route: ServerRoute = {
  method: "POST",
  path: "/rounds/results",
  handler: (request) => storeRoundResult(request.payload as RoundResultDto),
  options: {
    validate: {
      payload: Joi.object({
        map: Joi.string().valid(...ALL_MAP_IDS).required(),
        teamMates: Joi.array().max(4).required().items(
          Joi.string().valid(...ALL_ATTACKER_IDS).required()),
        defenders: Joi.array().max(5).required().items(
          Joi.string().valid(...ALL_DEFENDER_IDS).required()),
        selected: Joi.string().valid(...ALL_ATTACKER_IDS).required()
      })
    }
  }
}

export default route