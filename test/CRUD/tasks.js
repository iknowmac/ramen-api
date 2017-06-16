/* global model */

const app = require('../../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;

const Task = model('task');
const User = model('user');

chai.use(chaiHttp);

describe('Task CRUD Integration Tests', function () {
  const server = chai.request(app);

  beforeEach(async function () {
    await Task.collection.drop();
    await User.collection.drop();
  });

  afterEach(async function () {
    await Task.collection.drop();
    await User.collection.drop();
  });

  it('should create a new task', function (next) {
    createTask({ name: 'Test task' }).end((err, res) => {
      expect(err).be.null;
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body._id).to.not.be.null;
      next();
    });
  });

  it('should return a single task', function (next) {
    createTask({ name: 'Test task', priority: 3 }).end((err, res) => {
      expect(err).be.null;
      server.get('/task/' + res.body._id).end(function (err, task) {
        expect(err).be.null;
        expect(task).to.have.status(200);
        expect(task).to.be.an('object');
        expect(task.body._id).equal(res.body._id);
        expect(task.body.priority).equal(3);
        next();
      });
    });
  });

  it('should update a single task', function (next) {
    createTask({ name: 'Test task', priority: 3 }).end((err, res) => {
      expect(err).be.null;
      server.put('/task/' + res.body._id).send({
        task: { name: 'New test task', priority: 0 },
      }).end(function (err, task) {
        expect(err).be.null;
        expect(task).to.have.status(200);
        expect(task).to.be.an('object');
        expect(task.body.name).equal('New test task');
        expect(task.body.priority).equal(0);
        next();
      });
    });
  });

  it('should delete a single task', function (next) {
    createTask({ name: 'Test Task' }).end((err, res) => {
      expect(err).be.null;
      server.delete('/task/' + res.body._id)
        .end(function (err, task) {
          expect(err).be.null;
          expect(task).to.have.status(200);
          expect(task.body._id).equal(res.body._id);
          next();
        });
    });
  });
});

function createTask(attrs) {
  const server = chai.request(app);
  return server.post('/tasks').send({ task: attrs });
}
