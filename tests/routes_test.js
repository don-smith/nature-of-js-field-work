import app from '../app';
import {should} from 'chai';
import * as store from '../dal/store';
import supertest from 'supertest-as-promised';

// supertest-as-promised defaults to Bluebird promises:
// use es6 instead
const request = supertest(Promise)(app);
const apiVersion = '1';

describe('Routes', () => {

  // There are better solutions for setting up fixtures with MongoDB.
  // We'll just keep it fairly simple here...
  before((done) => {
    app.set('DB', 'field-test');
    done();
  });

  after((done) => {
    store.connect()
      .then(db => db.dropDatabase())
      .then(ok => done(), done);
  });

  describe('GET /rangers', () => {

    it('should return a response as JSON', () => {
      return request.get(`/api/v${apiVersion}/rangers`)
        .expect(200)
        .then(res => {
          res.header['content-type'].should.contain('application/json');
        });
    });

  });

  describe('POST /rangers', () => {

    it('should respond with object with correct properties', () => {
      return request.post(`/api/v${apiVersion}/rangers`)
        .send({name: "Bartholemew"})
        .then(res => {
          res.body.should.ownProperty('name');
          res.body.should.ownProperty('x');
          res.body.should.ownProperty('y');
          res.body.should.ownProperty('turn');
        });
    });

    it('should not allow rangers without a name', () => {
      return request.post(`/api/v${apiVersion}/rangers`)
        .send({})
        .expect(400)
        .then(res => res.body.error.should.equal("That mammal is invalid!"));
    });

  });

});

