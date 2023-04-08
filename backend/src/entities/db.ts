import { Collection, CreateIndexesOptions, IndexDirection, IndexSpecification, MongoClient, WithId } from "mongodb";
import { JSONSchema4 } from "json-schema"
import { isArray } from "lodash";
import { Schema, TypeFromSchema } from "shared/schemas";

const connectionString = process.env.MONGO_ATLAS_CONNECTION ?? (() => {
  throw "Missing ENV var 'MONGO_ATLAS_CONNECTION'"
})()

const client = new MongoClient(connectionString)
const db = client.db("test")

type Index<T> = Partial<Record<keyof WithId<T> | string, IndexDirection>>

type CollectionConfig<T> = {
  jsonSchema: JSONSchema4
  indexes?: (Index<T> | [Index<T>, CreateIndexesOptions])[]
}

const COLLECTION_CONFIGS: Record<string, CollectionConfig<unknown>> = {}

export function registerCollection<TSchema extends Schema<unknown, false>,
  TResult = TypeFromSchema<TSchema> extends Record<string, unknown> ? Collection<TypeFromSchema<TSchema>> : never>(
  name: string, schema: TSchema, config?: Omit<CollectionConfig<TSchema>, "jsonSchema">): TResult {
  COLLECTION_CONFIGS[name] = {
    jsonSchema: schema.toJsonSchema(),
    ...config
  }
  return db.collection(name) as TResult
}

export async function setupCollections() {
  for (const [name, config] of Object.entries(COLLECTION_CONFIGS)) {
    if (config.jsonSchema) await applyValidator(name, config.jsonSchema)
    if (config.indexes) await applyIndexes(name, config.indexes)
  }
}

async function applyValidator(name: string, schema: JSONSchema4) {
  await db.command({
    collMod: name,
    validator: {
      $jsonSchema: schema
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