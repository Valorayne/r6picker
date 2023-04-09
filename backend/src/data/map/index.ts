import { MapDto, MapId } from "shared/types"
import { BANK } from "./bank";
import { BARTLETT } from "./bartlett";

export const ALL_MAPS: Record<MapId, MapDto> = {
  bank: BANK,
  bartlett: BARTLETT
}