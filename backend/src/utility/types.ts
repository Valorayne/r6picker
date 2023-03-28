export function mapToObject<K extends string | number | symbol, V>(map: Map<K, V>): Record<K, V> {
  const result: any = {}
  for (const [key, value] of map.entries())
    result[key] = value
  return result
}