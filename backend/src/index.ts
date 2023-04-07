import Hapi from "@hapi/hapi"
import hapiInert from "@hapi/inert"
import { ALL_ROUTES } from "./routes";
import { setupCollections } from "./entities/db";

async function runServer() {
  await setupCollections()
  const server = Hapi.server({
    port: 5100,
    host: 'localhost',
    routes: { cors: true }
  });
  await server.register(hapiInert)
  await server.route(ALL_ROUTES)
  await server.start();
  return server
}

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
})

runServer().then(server => console.log('Server running on %s', server.info.uri))