import Hapi from "@hapi/hapi"
//@ts-ignore
import hapiRouter from "hapi-router"

async function runServer() {
  const server = Hapi.server({ port: 3000, host: 'localhost' });
  await server.register({ plugin: hapiRouter, options: { routes: "**/**.route.ts" } })
  await server.start();
  return server
}

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
})

runServer().then(server => console.log('Server running on %s', server.info.uri))