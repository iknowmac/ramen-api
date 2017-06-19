/* global debug */

const mongoose = require('mongoose');
const bluebird = require('bluebird');

const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;

const DB_AUTH = process.env.DB_USER
  ? `${process.env.DB_USER}:${process.env.DB_PASSWORD}@`
  : '';

const DB_URI = `mongodb://${DB_AUTH}${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const configs = {
  test: { mode: 'test', port: 3000, uri: `${DB_URI}_test` },
  development: { mode: 'development', port: 3000, uri: `${DB_URI}_development` },
  staging: { mode: 'staging', port: 8080, uri: `${DB_URI}_staging` },
  production: { mode: 'production', port: 8080, uri: `${DB_URI}_production` },
};

const config = exports.config = function (mode) {
  return configs[mode || process.argv[2] || 'development'] || configs.development;
};

exports.load = function (mode) {
  const conf = config(mode);

  mongoose.Promise = bluebird;
  mongoose.connect(conf.uri, (err) => {
    if (err) {
      debug('mongodb', `Error connecting to database ${conf.uri} ${err}`);
    }

    if (process.env.NODE_ENV !== 'test') {
      debug('mongodb', `Connected to database ${conf.uri}`);
    }
  });

  return null;
};
