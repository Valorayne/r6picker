import { ServerRoute } from "@hapi/hapi";
import getMapLayerRoute from "./files/getMapLayer";
import getAllOperatorsRoute from "./operators/getAllOperators";
import getNewRoundRoute from "./rounds/getNewRound";
import postRoundResultRoute from "./rounds/postRoundResult";

export const ALL_ROUTES: ServerRoute[] = [
  getMapLayerRoute,
  getAllOperatorsRoute,
  getNewRoundRoute,
  postRoundResultRoute
]