/**
 * Main application file
 */

'use strict';

import express from 'express';
import sqldb from './sqldb';
import config from './config/environment';
import http from 'http';

// Populate databases with sample data
if (config.seedDB) { require('./config/seed'); }

// Setup server
var ExpressStormpath = require('express-stormpath');
var path = require('path');
var app = express();
app.use(ExpressStormpath.init(app,{
  website: true,
  web: {
    spaRoot: path.join(__dirname, '..','client','index.html')
  }
}));
var server = http.createServer(app);
require('./config/express')(app);
require('./routes')(app);

// Start server
function startServer() {
  app.angularFullstack = app.on('stormpath.ready',function() { server.listen(config.port, config.ip, function() {
    	console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  	});
  });
}

sqldb.sequelize.sync()
  .then(startServer)
  .catch(function(err) {
    console.log('Server failed to start due to error: %s', err);
  });

// Expose app
exports = module.exports = app;
