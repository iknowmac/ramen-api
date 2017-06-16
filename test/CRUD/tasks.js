/* global model */

const helper = require('../helper');
const app = require('../../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;

const Task = model('task');

chai.use(chaiHttp);

const api = '/tasks';

describe('Task CRUD Integration Tests', function () {

  beforeEach(async function () {
    await helper.dropCollection(Task);
  });

  afterEach(async function () {
    await helper.dropCollection(Task);
  });

  it(`should add a SINGLE task on ${api} POST`, function (next) {
    helper.createTaskObject({ name: 'Task One', priority: 1 }, api)
    .end(function (err, res) {
      expect(err).be.null;
      expect(res).to.have.status(200);
      expect(res).to.be.an('object');
      expect(res.body._id).to.not.be.null;
      next();
    });
  });

  it(`should list a SINGLE task on ${api}/<id> GET`, function (next) {
    helper.createTaskObject({ name: 'Task Two', priority: 2 }, api)
    .end(function (err, res) {
      expect(err).be.null;
      chai.request(app).get(`${api}/${res.body._id}`)
      .end(function (err, task) {
        expect(err).be.null;
        expect(task).to.have.status(200);
        expect(task).to.be.an('object');
        expect(task.body._id).equal(res.body._id);
        expect(task.body.priority).equal(2);
        next();
      });
    });
  });

  it(`should update a SINGLE task on ${api}/<id> PUT`, function (next) {
    helper.createTaskObject({ name: 'Task Three', priority: 3 }, api)
    .end((err, res) => {
      expect(err).be.null;
      chai.request(app).put(`${api}/${res.body._id}`).send({
        task: { name: 'Task Three Update', priority: 0 },
      })
      .end(function (err, task) {
        expect(err).be.null;
        expect(task).to.have.status(200);
        expect(task).to.be.an('object');
        expect(task.body.name).equal('Task Three Update');
        expect(task.body.priority).equal(0);
        next();
      });
    });
  });

  it(`should delete a SINGLE task on ${api}/<id> DELETE`, function (next) {
    helper.createTaskObject({ name: 'Task Four', priority: 0 }, api)
    .end((err, res) => {
      expect(err).be.null;
      chai.request(app).delete(`${api}/${res.body._id}`)
        .end(function (err, task) {
          expect(err).be.null;
          expect(task).to.have.status(200);
          expect(task.body._id).equal(res.body._id);
          next();
        });
    });
  });
});
