import app from '../../app';
import supertest from 'supertest-as-promised';
import chai from 'chai';

const request = supertest(Promise)(app);
const should = chai.should();
const apiVersion = '1';

describe('Wombats (e2e):', () => {

  describe('GET /wombats', () => {

    it('should return a response as JSON', () => {
      return request.get(`/api/v${apiVersion}/wombats`)
        .expect(200)
        .then(res => 
          res.header['content-type'].should.contain('application/json')
        );
    });

  });

  describe('POST /wombats', () => {

    it('should respond with object with correct properties', () => {
      return request.post(`/api/v${apiVersion}/wombats`)
        .send({name: "Gershwin"})
        .expect(201)
        .then(res => 
          res.body.should.include.keys('name', 'x', 'y', 'turn')
        );
    });

    it('should not allow wombats without a name', () => {
      return request.post(`/api/v${apiVersion}/wombats`)
        .send({})
        .expect(400)
        .then(res => 
          res.body.error.should.equal("That mammal is invalid!")
        );
    });

    context('on turn 1', () => {
      before(() => app.set('TURN', 1));
      after(() => app.set('TURN', 0));

      it('should not allow wombats', () => {
        return request.post(`/api/v${apiVersion}/wombats`)
          .send({name: 'Thelonious'})
          .expect(400)
          .then(res => res.body.error.should.equal(
            "Can't add mammals after the round begins."
          ));
      });
    });

    context('with size 20', () => {
      const size = app.get('MAP_SIZE');
      before(() => app.set('MAP_SIZE', 20));
      after(() => app.set('MAP_SIZE', size));

      it('should allow fixed coordinates to be specified', () => {
        return request.post(`/api/v${apiVersion}/wombats`)
          .send({
            name: 'Ellington',
            locator: 'fixed',
            x: 19,
            y: 0
          })
          .expect(201);
      });

      it('should respond with an error if coordinates out of bounds', () => {
        return request.post(`/api/v${apiVersion}/wombats`)
          .send({
            name: 'Coltrane',
            locator: 'fixed',
            x: 20,
            y: 1
          })
          .expect(400)
          .then(res => res.body.error.should.equal("Out of bounds."));
      });
    });

  });

});
