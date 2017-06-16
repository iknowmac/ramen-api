
const chai = require('chai');
const expect = chai.expect;

chai.use(require('chai-fs'));

describe('Configuration Unit Tests', function () {
  it('should load test config', function (next) {
    const conf = require('../../db').config('test');
    expect(conf.mode).to.equal('test');
    next();
  });

  it('should load development config', function (next) {
    const conf = require('../../db').config('development');
    expect(conf.mode).to.equal('development');
    next();
  });

  it('should load staging config', function (next) {
    const conf = require('../../db').config('staging');
    expect(conf.mode).to.equal('staging');
    next();
  });

  it('should load production config', function (next) {
    const conf = require('../../db').config('production');
    expect(conf.mode).to.equal('production');
    next();
  });

  it(`should load the current (${process.env.NODE_ENV}) enviorment config`, function (next) {
    const conf = require('../../db').config(process.env.NODE_ENV);
    expect(conf.mode).to.equal('test');
    next();
  });
});
