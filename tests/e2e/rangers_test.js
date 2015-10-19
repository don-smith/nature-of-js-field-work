import app from '../../app';
import supertest from 'supertest-as-promised';
import chai from 'chai';

// supertest-as-promised defaults to Bluebird promises:
// use es6 instead
const request = supertest(Promise)(app);
const should = chai.should();
const apiVersion = '1';

describe('Rangers (e2e):', () => {

  describe('GET /rangers', () => {

    it('should return a response as JSON', () => {
      return request.get(`/api/v${apiVersion}/rangers`)
        .expect(200)
        .then(res => 
          res.header['content-type'].should.contain('application/json')
        );
    });

  });

  describe('POST /rangers', () => {

    it('should respond with object with correct properties', () => {
      return request.post(`/api/v${apiVersion}/rangers`)
        .send({name: "Gershwin"})
        .expect(201)
        .then(res => 
          res.body.should.include.keys('name', 'x', 'y', 'turn')
        );
    });

    it('should not allow rangers without a name', () => {
      return request.post(`/api/v${apiVersion}/rangers`)
        .send({})
        .expect(400)
        .then(res => 
          res.body.error.should.equal("That mammal is invalid!")
        );
    });

    context('on turn 1', () => {
      before(() => app.set('TURN', 1));
      after(() => app.set('TURN', 0));

      it('should not allow rangers', () => {
        return request.post(`/api/v${apiVersion}/rangers`)
          .send({name: 'Thelonious'})
          .expect(400)
          .then(res => res.body.error.should.equal(
            "Can't add mammals after the round begins."
          ));
      });
    });

  });

  describe('GET /rangers/:name', () => {

    before(() => 
      request.post(`/api/v${apiVersion}/rangers`).send({name: 'Ellington'})
    );

    it('should retrieve a mammal by name', () => {
      return request.get(`/api/v${apiVersion}/rangers/ellington`)
        .expect(200)
        .then(res => res.body.name.should.equal('ellington'));
    });

  });

  describe('DELETE /rangers/:name', () => {

    before(() => 
      request.post(`/api/v${apiVersion}/rangers`).send({name: 'Basie'})
    );

    it('should delete a mammal by name', () => {
      return request.delete(`/api/v${apiVersion}/rangers/basie`)
        .expect(204);
    });

  });
});

