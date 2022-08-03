const dotenv = require("dotenv").config();
const http = require("http");
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const swaggerUI = require('swagger-ui-express');

const app = express();
const port = process.env.PORT;
const server = http.createServer(app);

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));
app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

require("./routes/index.js")(app);

module.exports = app;

// app.set("port", port);
// server.listen(port); 