/* global __appRoot debug */

require('dotenv').load({ path: '.env' });
require('../../globals').load();

const seeder = require('mongoose-seed-plus');
const chalk = require('chalk');
const path = require('path');
const config = require('../../db').config(process.env.NODE_ENV);

const options = {
  mongodb: {
    host: config.dbhost,
    port: config.dbport,
    dbname: config.dbname
  },
  dump: {
    enable: false
  },
  models: [
    { path: path.join(__appRoot, 'models/task.js'), name: 'Task', clear: true },
    { path: path.join(__appRoot, 'models/user.js'), name: 'User', clear: true }
  ],
  path: path.join(__dirname, '/migrations')
};

new seeder(options, (err, result) => {
  if (err) {
    throw err.message;
  }

  console.log(`Successfully connected to MongoDB: ${chalk.grey(result.db)}\n`);

  if (result.cleared) {
    console.log(chalk.cyan(`Cleared Models`));
    for (var i in result.cleared) {
      console.log(`${chalk.red(result.cleared[i])}`);
    }
    console.log('\r');
  }

  console.log(chalk.cyan('Seeded Model: Documents'));
  for (var prop in result.populate) {
    console.log(`${chalk.green(prop)}: ${chalk.grey(result.populate[prop])}`);
  }

  console.log('\r');
});
