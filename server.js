// const express = {'express'};
const http = require('http');
const port = 3001;
const app = require('../blog_api/app');

const Server = http.createServer(app)

Server.listen(port,()=> {console.log("app is running on port " +port)})
