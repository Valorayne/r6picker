import { MongoClient } from "mongodb";

const connectionString = process.env.MONGO_ATLAS_CONNECTION ?? (() => {
  throw "Missing ENV var 'MONGO_ATLAS_CONNECTION'"
})()

const client = new MongoClient(connectionString)

type CreateCollectionProps<T extends Record<string, unknown>> = {
  name: string
}

export const setupCollection = <T extends Record<string, unknown>>({ name }: CreateCollectionProps<T>) => {
  return client.db("test").collection<T>(name)
}