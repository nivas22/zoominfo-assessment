const express = require('express');
const config = require('config');
const bodyParser = require("body-parser");
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const userService = require('./services/user.service');
const fileService = require('./services/file.service');
const routes = require('./routes/index.route');

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
};

const PROTO_PATH = __dirname + '/proto/';

let packageDefinition =  protoLoader.loadSync([
  PROTO_PATH + "/users.proto",
  PROTO_PATH + "/files.proto",
], options);

let userProto = grpc.loadPackageDefinition(packageDefinition).user;
const fileProto = grpc.loadPackageDefinition(packageDefinition).files;

// Create a server
const app = express();
const server = new grpc.Server();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', routes);

// Add the service
server.addService(userProto.UserService.service, userService);
server.addService(fileProto.FileService.service, fileService);

server.bindAsync(`0.0.0.0:${config.grpcPort}`, grpc.ServerCredentials.createInsecure(),
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
