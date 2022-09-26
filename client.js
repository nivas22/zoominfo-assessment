
const grpc = require('@grpc/grpc-js');
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = __dirname + '/proto/';

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
};

let packageDefinition =  protoLoader.loadSync([
  PROTO_PATH + "/users.proto"
], options);

const userProto = grpc.loadPackageDefinition(packageDefinition).user;
const client = new userProto.UserService(
	"localhost:50051",
	grpc.credentials.createInsecure()
);

module.exports = client;