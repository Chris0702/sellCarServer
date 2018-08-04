var express = require('express');
var app = express();
var webRouter = require("./lib/web_router");
var dataBaseInit = require("./lib/db/dataBaseInit");
var config = require('./lib/config').config;
var serverPort = config.serverPort;
var mongoDBPort = config.mongoDBPort;
var mongoDBName = config.mongoDBName;
var server = require('http').createServer(app);
var serverUse=require('./lib/serverUse');

//--------------rest---api------------------------------
var carRestApi = require("./lib/rest_api/car");
var salesRestApi = require("./lib/rest_api/sales");
var staffRestApi = require("./lib/rest_api/staff");
var testDriveRestApi = require("./lib/rest_api/testDrive");
var companyRestApi = require("./lib/rest_api/company");


dataBaseInit.mongoDBInit(mongoDBPort,mongoDBName);
serverUse.on(app);
webRouter.on(app);

carRestApi.on(app);
salesRestApi.on(app);
staffRestApi.on(app);
testDriveRestApi.on(app);
companyRestApi.on(app);

server.listen(process.env.PORT||serverPort);
console.log("iis 現在使用" + process.env.PORT + " port");
console.log("現在使用" + serverPort + "port");