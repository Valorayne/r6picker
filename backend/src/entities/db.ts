import { Collection, CreateIndexesOptions, IndexDirection, IndexSpecification, MongoClient, WithId } from "mongodb";
import { JSONSchema4 } from "json-schema"
import { isArray } from "lodash";

const connectionString = process.env.MONGO_ATLAS_CONNECTION ?? (() => {
  throw "Missing ENV var 'MONGO_ATLAS_CONNECTION'"
})()

const client = new MongoClient(connectionString)
const db = client.db("test")

type CreateCollectionProps<T> = {
  name: string
} & CollectionConfig<T>

type Index<T> = Partial<Record<keyof WithId<T> | string, IndexDirection>>

type CollectionConfig<T> = {
  validator?: JSONSchema4
  indexes?: (Index<T> | [Index<T>, CreateIndexesOptions])[]
}

const COLLECTION_CONFIGS: Record<string, CollectionConfig<unknown>> = {}

export function registerCollection<T extends Record<string, unknown>>({
  name,
  ...config
}: CreateCollectionProps<T>): Collection<T> {
  COLLECTION_CONFIGS[name] = config
  return db.collection<T>(name)
}

export async function setupCollections() {
  for (const [name, config] of Object.entries(COLLECTION_CONFIGS)) {
    if (config.validator) await applyValidator(name, config.validator)
    if (config.indexes) await applyIndexes(name, config.indexes)
  }
}

async function applyValidator(name: string, validator: JSONSchema4) {
  await db.command({
    collMod: name,
    validator: {
      $jsonSchema: validator
    }
  })
}

async function applyIndexes<T>(name: string, indexes: Required<CollectionConfig<T>>["indexes"]) {
  const collection = db.collection(name)
  await collection.dropIndexes()
  for (const index of indexes) {
    const [spec, options] = isArray(index) ? index : [index, undefined]
    await collection.createIndex(spec as IndexSpecification, options)
  }
}