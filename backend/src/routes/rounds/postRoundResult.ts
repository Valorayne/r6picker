import { ServerRoute } from "@hapi/hapi"
import { storeRoundResult } from "../../models/rounds";
import { RoundResultDto } from "shared/rounds";
import { RoundResultSchema } from "../../entities/roundResultEntity";
import { validateBySchema } from "../../utility/validation";

const route: ServerRoute = {
  method: "POST",
  path: "/rounds/results",
  handler: (request) => storeRoundResult(request.payload as RoundResultDto),
  options: {
    validate: {
      payload: validateBySchema(RoundResultSchema)
    }
  }
}

export default route