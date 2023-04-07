import { ServerRoute } from "@hapi/hapi"
import Joi from "joi";
import { ALL_MAP_IDS } from "shared/maps";
import { storeRoundResult } from "../../models/rounds";
import { ALL_ATTACKER_IDS, ALL_DEFENDER_IDS } from "shared/operators";
import { RoundResultDto } from "shared/rounds";
import {
  BombObjectiveDto,
  HostageObjectiveDto,
  LocationDto,
  ObjectiveDto,
  SecureAreaObjectiveDto
} from "shared/objectives";
import { PositionDto } from "shared/types";

const locationSchema = Joi.object<LocationDto>({
  layer: Joi.number().required(),
  position: Joi.object<PositionDto>({
    x: Joi.number().required(),
    y: Joi.number().required()
  }).required()
}).required()

const bombObjectiveSchema = Joi.object<BombObjectiveDto>({
  type: Joi.string().valid("bomb").required(),
  id: Joi.string().required(),
  a: locationSchema,
  b: locationSchema,
})

const hostageObjectiveSchema = Joi.object<HostageObjectiveDto>({
  type: Joi.string().valid("hostage").required(),
  id: Joi.string().required(),
  location: locationSchema,
})

const secureAreaObjectiveSchema = Joi.object<SecureAreaObjectiveDto>({
  type: Joi.string().valid("secureArea").required(),
  id: Joi.string().required(),
  location: locationSchema,
})

const route: ServerRoute = {
  method: "POST",
  path: "/rounds/results",
  handler: (request) => storeRoundResult(request.payload as RoundResultDto),
  options: {
    validate: {
      payload: Joi.object<RoundResultDto>({
        map: Joi.string().valid(...ALL_MAP_IDS).required(),
        teamMates: Joi.array().max(4).required().items(
          Joi.string().valid(...ALL_ATTACKER_IDS).required()),
        defenders: Joi.array().max(5).required().items(
          Joi.string().valid(...ALL_DEFENDER_IDS).required()),
        selected: Joi.string().valid(...ALL_ATTACKER_IDS).required(),
        objective: Joi.alternatives<ObjectiveDto>([
          bombObjectiveSchema,
          hostageObjectiveSchema,
          secureAreaObjectiveSchema
        ]).required()
      })
    }
  }
}

export default route