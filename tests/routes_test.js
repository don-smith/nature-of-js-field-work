import app from '../app';
import mocha from 'mocha';
import chai from 'chai';
import * as store from '../dal/store';
import supertest from 'supertest';

let should = chai.should();
let request = supertest(app);
let apiVersion = '1';

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

    it('should return a response as JSON', done => {
      request
        .get(`/api/v${apiVersion}/rangers`)
        .end(function (err, res) {
          if (err) throw err;
          res.header['content-type'].should.contain('application/json');
          done();
        });
    });

    it('should set HTTP status 200', done => {
      request
        .get(`/api/v${apiVersion}/rangers`)
        .end((err, res) => {
          if (err) throw err;
          res.statusCode.should.equal(200);
          done();
        });
    });

  });

  describe('POST /rangers', () => {

    it('should respond with object with correct properties', done => {
      request
        .post(`/api/v${apiVersion}/rangers`)
        .send({name: "blarg"})
        .end((err, res) => {
          if (err) throw err;
          res.body.should.ownProperty('name');
          res.body.should.ownProperty('x');
          res.body.should.ownProperty('y');
          res.body.should.ownProperty('turn');
          done();
        });
    });

    it('should not allow rangers without a name', done => {
      request
        .post(`/api/v${apiVersion}/rangers`)
        .send({})
        .end((err, res) => {
          if (err) throw err;
          res.statusCode.should.equal(400);
          res.body.error.should.equal("That mammal is invalid!");
          done();
        });
    });

  });

  //describe('POST, GET /wombats/:id', function () {

    //it('should allow retrieval of a Wombat by id after saving one', function (done) {
      //let wombat = { name: 'Coltrane' };
      //request
        //.post(`/api/v${apiVersion}/wombats`)
        //.send(wombat)
        //.end(function (err, res) {
          //if (err) {
            //throw err;
          //}

          //let expected = res.body;
          //request
            //.get(`/api/v${apiVersion}/wombats/${expected._id}`)
            //.end(function (err, res) {
              //if (err) {
                //throw err;
              //}
              //let actual = res.body;
              //actual.should.deep.equal(expected);
            //});
        //});
      //done();
    //});

  //});

});

