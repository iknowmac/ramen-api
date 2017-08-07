/* global debug */

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;

const DB_AUTH = process.env.DB_USER
  ? `${process.env.DB_USER}:${process.env.DB_PASSWORD}@`
  : '';

const DB_URI = `mongodb://${DB_AUTH}${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const configs = {
  test: {
    mode: 'test',
    port: 3000,
    dbhost: DB_HOST,
    dbport: DB_PORT,
    dbname: `${DB_NAME}_test`,
    uri: `${DB_URI}_test`
  },
  development: {
    mode: 'development',
    port: 3000,
    dbhost: DB_HOST,
    dbport: DB_PORT,
    dbname: `${DB_NAME}_development`,
    uri: `${DB_URI}_development`
  },
  staging: {
    mode: 'staging',
    port: 8080,
    dbhost: DB_HOST,
    dbport: DB_PORT,
    dbname: `${DB_NAME}_staging`,
    uri: `${DB_URI}_staging`
  },
  production: {
    mode: 'production',
    port: 8080,
    dbhost: DB_HOST,
    dbport: DB_PORT,
    dbname: `${DB_NAME}_production`,
    uri: `${DB_URI}_production`
  },
};

const config = exports.config = function (mode) {
  return configs[mode || process.argv[2] || 'development'] || configs.development;
};

exports.load = function (mode) {
  const conf = config(mode);

  return mongoose.connect(conf.uri, { useMongoClient: true }).then(
    () => {
      if (process.env.NODE_ENV !== 'test') {
        debug('mongodb', `Connected to database ${conf.uri}`);
      }
    },
    (err) => {
      debug('mongodb', `Error connecting to database ${conf.uri} ${err}`);
    }
  );

};
