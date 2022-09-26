<h1 align="center">ZoomInfo Assessment</h1>

## About the project
A proof of concept demo of how to manage the files storage using gPRC.

## Features
- **GRPC**: The services communicate with each other using GRPC framework to reduce latency in network calls
- **API Gateway**: This application has api gateway(Express) service which can route api calls to desired gPRC services
- **JWT Authentication**: This also showcases how you can secure a service with authentication middleware


## Architecture
The project is simplest file management software. A user can register, create files/folders and download the file. 
So we have divided the responsibilities into 2 services.

- **User Service**: It handles user registration/login and authentication for other services using gPRC
- **File Service**: It helps to manage the files

## How to Run

This service is written in NodeJS. So, nodejs and npm needs to be installed in the system. We have also used mySQL as data layer. Currently, I install MySQL locally Required tools
- **NodeJS**, along with it npm
- **gPRC**
- **MYSQL**

After that, run `npm install` from root directory. The required compiled proto files are already in `proto` directory.
Then run the service with `npm run start`

And now you set the application and its running that you can access with the proxy server's url `localhost:3000`

## Roadmap
- User managment
- File creation
- Folder creation
- Moving files
- Download files