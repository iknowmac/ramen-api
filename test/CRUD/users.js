/* global model */

const helper = require('../helper');
const app = require('../../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;

const User = model('user');

chai.use(chaiHttp);

const api = '/users';

describe('User CRUD Integration Tests', function () {

  beforeEach(async function () {
    await helper.dropCollection(User);
  });

  afterEach(async function () {
    await helper.dropCollection(User);
  });

  it(`should add a SINGLE user on ${api} POST`, function (next) {
    helper.createUserObject({
      username: 'diana',
      email: 'wonder.woman@marvel.com',
      password: 'girlpower!',
    }, api)
    .end(function (err, res) {
      expect(err).be.null;
      expect(res).to.have.status(200);
      expect(res).to.be.an('object');
      expect(res.body._id).to.not.be.null;
      next();
    });
  });

  it(`should list a SINGLE user on ${api}/<id> GET`, function (next) {
    helper.createUserObject({
      firstName: 'Peter',
      lastName: 'Parker',
      username: 'spidey',
      email: 'spidey@marvel.com',
      password: 'webslinger',
    }, api)
    .end(function (err, res) {
      expect(err).be.null;
      chai.request(app).get(`${api}/${res.body._id}`)
      .end(function (err, user) {
        expect(err).be.null;
        expect(user).to.have.status(200);
        expect(user).to.be.an('object');
        expect(user.body._id).equal(res.body._id);
        expect(user.body.username).equal('spidey');
        next();
      });
    });
  });

  it(`should update a SINGLE user on ${api}/<id> PUT`, function (next) {
    helper.createUserObject({
      firstName: 'Steve',
      lastName: 'Rogers',
      username: 'america',
      email: 'captian@marvel.com',
      password: 'goodguy',
    }, api)
    .end((err, res) => {
      expect(err).be.null;
      chai.request(app).put(`${api}/${res.body._id}`).send({
        user: {
          firstName: 'Stephen',
          lastName: 'Rogers',
          username: 'goodguy',
          email: 'captian@marvel.com',
          password: 'america!',
        },
      })
      .end(function (err, user) {
        expect(err).be.null;
        expect(user).to.have.status(200);
        expect(user).to.be.an('object');
        expect(user.body.firstName).equal('Stephen');
        expect(user.body.username).equal('goodguy');
        next();
      });
    });
  });

  it(`should delete a SINGLE user on ${api}/<id> DELETE`, function (next) {
    helper.createUserObject({
      username: 'bigguy',
      email: 'hulk@marvel.com',
      password: 'smash!',
    }, api)
    .end((err, res) => {
      expect(err).be.null;
      chai.request(app).delete(`${api}/${res.body._id}`)
        .end(function (err, user) {
          expect(err).be.null;
          expect(user).to.have.status(200);
          expect(user.body._id).equal(res.body._id);
          next();
        });
    });
  });
});
