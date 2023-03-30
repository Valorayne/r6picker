// @ts-ignore
import Hapi from "@hapi/hapi"
// @ts-ignore
import hapiRouter from "hapi-router"
import hapiInert from "@hapi/inert"
import { connect } from "mongoose"
import { ALL_ROUTES } from "./routes";

const connectionString = process.env.MONGO_ATLAS_CONNECTION ?? (() => {
  throw "Missing ENV var 'MONGO_ATLAS_CONNECTION'"
})()

async function runServer() {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    routes: { cors: true }
  });
  await server.register(hapiInert)
  await server.route(ALL_ROUTES)
  await connect(connectionString)
  await server.start();
  return server
}

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
})

runServer().then(server => console.log('Server running on %s', server.info.uri))