import express from 'express';
import app from '../app';

let reset = express.Router();

reset.route('/reset')

  // GET /reset
  .get((req, res) => {
    app.set('TURN', 0);
    res.sendStatus(200);
  });

export default reset;
