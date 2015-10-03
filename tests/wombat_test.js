import app from '../app';
import Wombat from '../models/wombat';
import mocha from 'mocha';
import chai from 'chai';
import supertest from 'supertest';
import mongoose from 'mongoose';

let should = chai.should();

let request = supertest(app);
let apiVersion = '1';

describe('Wombat API', function () {

  before(function (done) {
    mongoose.connect(`mongodb://${process.env.IP}/wombat_test`);
    done();
  });

  after(function (done) {
    mongoose.disconnect();
    done();
  });

  beforeEach(function (done) {
    let wombat = new Wombat();
    wombat.name = 'Thelonious';
    wombat.save(function (err) {
      done(err);
    });
  });

  afterEach(function (done) {
    // Drop the contents of collection between tests
    //Wombat.remove({}, function (err) {
      //done(err);
    //});
    done();
  });

  it('responds with 404 for root URL', function (done) {
    request
    .get('/')
    .end(function (err, res) {
      if (err) {
        throw err;
      }
      res.statusCode.should.equal(404);
    });
    done();
  });

    describe('GET /wombats', function () {

    it('should return a response as JSON', function (done) {
      request
        .get(`/api/v${apiVersion}/wombats`)
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          res.header['content-type'].should.contain('application/json');
        });
      done();
    });

    it('should set HTTP status 200', function (done) {
      request
        .get(`/api/v${apiVersion}/wombats`)
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          res.statusCode.should.equal(200);
        });
      done();
    });

  });

  describe('POST /wombats', function () {

    it('should return a Wombat with the correct name', function(done) {
      let wombat = { name: 'Wazza' };
      request
        .post(`/api/v${apiVersion}/wombats`)
        .send(wombat)
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          res.body.name.should.equal('Wazza');
        });
      done();
    });

  });

  describe('POST, GET /wombats/:id', function () {

    it('should allow retrieval of a Wombat by id after saving one', function (done) {
      let wombat = { name: 'Coltrane' };
      request
        .post(`/api/v${apiVersion}/wombats`)
        .send(wombat)
        .end(function (err, res) {
          if (err) {
            throw err;
          }

          let expected = res.body;
          request
            .get(`/api/v${apiVersion}/wombats/${expected._id}`)
            .end(function (err, res) {
              if (err) {
                throw err;
              }
              let actual = res.body;
              actual.should.deep.equal(expected);
            });
        });
      done();
    });

  });

});

