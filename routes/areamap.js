import express from 'express';
import * as respond from './respond';
import * as mammals from '../dal/mammals';

let areaMap = express.Router();

areaMap.route('/areamap')

  // GET /map
  .get((req, res) => {
    mammals.getAll('rangers').then(rangers => {
      mammals.getAll('wombats').then( wombats => {
        respond.withAreaMap(res, rangers, wombats, req.query);
      }, err => respond.withError(res, err));
    }, err => respond.withError(res, err));
  });

export default areaMap;
