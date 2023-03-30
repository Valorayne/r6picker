import { ServerRoute } from "@hapi/hapi";
import getMapLayerRoute from "./maps/getOneMapLayerFile";
import getAllOperatorsRoute from "./operators/getAllOperators";
import getNewRoundRoute from "./rounds/getNewRound";
import postRoundResultRoute from "./rounds/postRoundResult";
import getOneMap from "./maps/getOneMap";

export const ALL_ROUTES: ServerRoute[] = [
  getMapLayerRoute,
  getAllOperatorsRoute,
  getNewRoundRoute,
  postRoundResultRoute,
  getOneMap
]