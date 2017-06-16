/* global __approot debug */

require('dotenv').load({ path: '.env' });
require('../../globals').load();

const path = require('path');
const bluebird = require('bluebird');
const seeder = require('mongoose-seed-plus');
const config = require('../../db').config(process.env.NODE_ENV);
const seeds = [
  { path: path.join(__approot, 'models/task.js'), name: 'Task', clear: true },
  { path: path.join(__approot, 'models/user.js'), name: 'User', clear: true },
];

seeder.Promise = bluebird;
seeder.connect(config.uri, (err) => {
  if (err) {
    debug('mongodb', `Error connecting to database ${config.uri} ${err}`);
  }

  debug('mongodb', `Connected to database ${config.uri}`);

  return seeder.start(__dirname, seeds, false);
});
