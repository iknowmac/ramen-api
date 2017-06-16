
const path = require('path');
const chai = require('chai');
const expect = chai.expect;

chai.use(require('chai-fs'));

describe('Configuration Unit Tests', function () {
  it('expect the .env file to exist', function (next) {
    const envFile = path.resolve(__dirname, '../../.env');
    expect(envFile).to.be.a.path();
    next();
  });

  it('should load test configuration', function (next) {
    const conf = require('../../db').config('test');
    expect(conf.mode).to.equal('test');
    next();
  });

  it('should load development configuration', function (next) {
    const conf = require('../../db').config('development');
    expect(conf.mode).to.equal('development');
    next();
  });

  it('should load staging configuration', function (next) {
    const conf = require('../../db').config('staging');
    expect(conf.mode).to.equal('staging');
    next();
  });

  it('should load production configuration', function (next) {
    const conf = require('../../db').config('production');
    expect(conf.mode).to.equal('production');
    next();
  });

  it('should load the current node enviorment configuration', function (next) {
    const conf = require('../../db').config(process.env.NODE_ENV);
    expect(conf.mode).to.equal('test');
    next();
  });
});
