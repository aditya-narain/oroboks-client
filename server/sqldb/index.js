/**
 * Sequelize initialization module
 */

'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _configEnvironment = require('../config/environment');

var _configEnvironment2 = _interopRequireDefault(_configEnvironment);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var db = {
  Sequelize: _sequelize2['default'],
  sequelize: new _sequelize2['default'](_configEnvironment2['default'].sequelize.uri, _configEnvironment2['default'].sequelize.options)
};

// Insert models below
db.Thing = db.sequelize['import']('../api/thing/thing.model');

exports['default'] = db;
module.exports = exports['default'];
//# sourceMappingURL=index.js.map
