/* global DEBUG_MODE __appRoot */

const path = require('path');
const moment = require('moment');
const chalk = require('chalk');

module.exports.load = function globalsLoad() {
  global.DEBUG_MODE = process.env.DEBUG_MODE;

  global.__appRoot = path.resolve(__dirname, '../');

  global.model = function model(filename) {
    const name = normalize(filename);
    return require(path.join(__appRoot, 'models', name));
  };

  global.debug = function (component, message) {
    if (DEBUG_MODE === 'true') {
      const datestr = moment();
      component = component.toUpperCase();
      console.log(
        `${datestr}` +
        chalk.yellow(` [${component}] `) +
        chalk.green(`${message}`)
      );
    }
  };
};

const normalize = (name) =>
  (name[0].toUpperCase() + name.substr(1))
    .match(/([A-Z][^A-Z]*)/g).join('-')
    .replace(/[_\s-]+/g, '-').toLowerCase();
