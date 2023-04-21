// This file should set up the express server as shown in the lecture code
import express from 'express'
import { dbConnection, closeConnection } from './config/mongoConnection.js'
import configRoutes from './routes/index.js'
import {fileURLToPath} from 'url';
import {dirname} from 'path';
import exphbs from 'express-handlebars';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const staticDir = express.static(__dirname + '/public');

const rewriteUnsupportedBrowserMethods = (req, res, next) => {
    if (req.body && req.body._method) {
      req.method = req.body._method;
      delete req.body._method;
    }
  
    next();
  };

const app = express()

app.use('/public', staticDir);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(rewriteUnsupportedBrowserMethods);

app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

configRoutes(app)

const server = app.listen(3000, async () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000');
    // await dbConnection()
});

server.on('exit', async (stream) => {
    // await closeConnection()
});
