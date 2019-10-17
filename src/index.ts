import * as connect from 'connect';
import * as http from 'http';
import * as swaggerTools from 'swagger-tools';
import * as dotenv from 'dotenv';
import * as yaml from 'js-yaml';
import * as fs from 'fs';
import * as bodyParser from 'body-parser';
// var bodyParser = require('body-parser');
dotenv.config();

var swaggerDoc = yaml.safeLoad(fs.readFileSync('./swagger.yml', 'utf8'));
const app = connect();
var serverPort =  3000;

var options = {
  controllers: './lib/controllers',
  useStubs: process.env.NODE_ENV === 'development' ? true : false
};

app.use(bodyParser.json({limit: 10 * 1024 * 1024}));
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
  app.use(middleware.swaggerMetadata());
  app.use(middleware.swaggerValidator());
  app.use(middleware.swaggerRouter(options));
  app.use(middleware.swaggerUi());
  http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
  });
});
