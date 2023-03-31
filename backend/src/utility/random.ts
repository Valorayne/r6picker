import { shuffle, take } from "lodash";

export function drawRandom<T>(array: readonly T[], amount: number): T[] {
  return take(shuffle(array), amount)
}