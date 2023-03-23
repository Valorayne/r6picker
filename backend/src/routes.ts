import {ServerRoute} from "@hapi/hapi"
import { operatorDetails } from "./routes/operatorDetails"

export const ROUTES: ServerRoute[] = [operatorDetails]