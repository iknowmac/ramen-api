
const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

exports.createTaskObject = function (obj, api) {
  return chai.request(app).post(api).send({ task: obj });
};

exports.createUserObject = function (obj, api) {
  return chai.request(app).post(api).send({ user: obj });
};

exports.dropCollection = async function (model) {
  return await model.remove({}, function (err) {
    if (err) { console.log(err);}
  });
};

exports.initUsers = async function (api) {
  return await users.map((user) =>
    chai.request(app).post(api).send({ user: user })
  );
};

const users = [
  {
    firstName: 'Peter',
    lastName: 'Parker',
    username: 'spidey',
    email: 'spidey@marvel.com',
    password: 'webslinger',
  },
  {
    username: 'bigguy',
    email: 'hulk@marvel.com',
    password: 'smash!',
  },
  {
    firstName: 'Steve',
    lastName: 'Rogers',
    username: 'america',
    email: 'captian@marvel.com',
    password: 'goodguy',
  },
];
