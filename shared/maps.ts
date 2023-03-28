export type MapId = (typeof ALL_MAP_IDS)[number]
export const ALL_MAP_IDS = ["bank"] as const

export type Layers = Record<number, string>