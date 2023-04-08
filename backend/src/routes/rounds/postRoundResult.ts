import { ServerRoute } from "@hapi/hapi"
import { storeRoundResult } from "../../models/rounds";
import { RoundResultDto, RoundResultDtoSchema } from "shared/types/rounds";
import { validateBySchema } from "../../utility/validation";

const route: ServerRoute = {
  method: "POST",
  path: "/rounds/results",
  handler: (request) => storeRoundResult(request.payload as RoundResultDto),
  options: {
    validate: {
      payload: validateBySchema(RoundResultDtoSchema)
    }
  }
}

export default route