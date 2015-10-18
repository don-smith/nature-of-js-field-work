import express from 'express';
import bodyparser from 'body-parser';
import path from 'path';
import rangers from './routes/rangers';
import wombats from './routes/wombats';
import areamap from './routes/areamap';
import {checkRoundStatus} from './routes/rounds';
import {argv} from 'yargs';

let app = express();

// output (nb: must come before app.use(... routes))
app.use(bodyparser.json());

// cors
app.use(function(req, res, next) {
  res.set('access-control-allow-origin', '*');
  res.set('access-control-allow-methods', 'get,put,post,delete,options');
  res.set('access-control-allow-headers', 
    'origin, x-requested-with, content-type, accept, authentication, content-length');

  if ('options' === req.method) {
    res.sendstatus(200);
  }

  next();
});

// prefix
app.use('/api/v1', rangers);
app.use('/api/v1', wombats);
app.use('/api/v1', areamap);

// static files in public
app.use('/', express.static(path.join(__dirname, 'public')));

// Map is square, default size is 20x20
app.set('MAP_SIZE',     argv.size    || 20);
app.set('RANGERS',      argv.rangers || 10);
app.set('WOMBATS',      argv.wombats || 5);
app.set('ROUND_LENGTH', argv.turns   || 10);
app.set('TURN', 0);
app.set('ROUND_ACTIVE', true);
app.set('DB', 'field-work');

export default app;
