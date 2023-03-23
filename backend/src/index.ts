import Hapi from "@hapi/hapi"

async function runServer() {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });
    await server.start();
    return server
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
})

runServer().then(server => console.log('Server running on %s', server.info.uri))