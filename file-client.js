
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
  PROTO_PATH + "/files.proto"
], options);

const fileProto = grpc.loadPackageDefinition(packageDefinition).files;
const client = new fileProto.FileService(
	"localhost:50052",
	grpc.credentials.createInsecure()
);

module.exports = client;