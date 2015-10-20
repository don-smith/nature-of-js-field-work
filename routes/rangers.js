import express from 'express';
import * as respond from './respond'
import * as mammals from '../dal/mammals';
import {incrementTurn} from '../gamelogic';
import {checkRoundStatus} from './rounds';

let rangers = express.Router();

// disallow PUT requests if round is over
rangers.put('/rangers/:name', checkRoundStatus);

rangers.route('/rangers')

  // GET /rangers
  .get((req, res) => {
    mammals.getAll('rangers')
      .then(
        rangers => res.send(rangers),
        err => respond.withError(res, err)
      );
  })

  // POST /rangers
  .post((req, res) => {
    mammals.create(req.body, 'rangers')
      .then(
        ranger => res.status(201).send(ranger),
        err => respond.withError(res, err)
      );
  });

rangers.route('/rangers/:name')

  // GET /rangers/bartholemew
  .get((req, res) => {
    mammals.get(req.params.name, 'rangers')
      .then(
        ranger => respond.withDocument(res, ranger),
        err => respond.withError(res, err)
      );
    })

  // PUT /rangers/bartholemew
  .put((req, res) => {
    incrementTurn()
      .then(mammals.update(req.params.name, req.body, 'rangers'))
      .then(
        result => res.send(result),
        err => respond.withError(res, err) 
      );
  })

  // DELETE /rangers/bartholemew
  .delete((req, res) => {
    mammals.remove(req.params.name, 'rangers')
      .then(
        result => res.sendStatus(204),
        err => respond.withError(res, err) 
      );
  });


export default rangers;
