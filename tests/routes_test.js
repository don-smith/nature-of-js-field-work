import app from '../app';
import supertest from 'supertest-as-promised';
import chai from 'chai';

// supertest-as-promised defaults to Bluebird promises:
// use es6 instead
const request = supertest(Promise)(app);
const should = chai.should();
const apiVersion = '1';

describe('Routes', () => {

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
          res.body.should.include.keys('name', 'x', 'y', 'turn');
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

