const express = require('express');
const config = require('config');
const bodyParser = require("body-parser");
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const app = express();
const server = new grpc.Server();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(),
(err, port)=>{
    if (err != null) {
        return console.error(err);
    }
    // start grpc server
    server.start();
    console.log(`gRPC listening on : ${port}`);
});

app.listen(config.port, () => {
  console.log("Express server listening on:", config.port);
});
