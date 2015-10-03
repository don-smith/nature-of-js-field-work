import express from 'express';
import bodyparser from 'body-parser';
import path from 'path';
import rangers from './routes/rangers';
import wombats from './routes/wombats';
import areamap from './routes/areamap';
import {checkRoundStatus} from './routes/rounds';

let app = express();

// output (nb: must come before app.use(... routes))
app.use(bodyparser.json());

// cors
app.use(function(req, res, next) {
  res.header('access-control-allow-origin', '*');
  res.header('access-control-allow-methods', 'get,put,post,delete,options');
  res.header('access-control-allow-headers', 
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
app.set('MAP_SIZE', process.argv[2] || 20);
app.set('RANGERS', process.argv[3] || 10);
app.set('WOMBATS', process.argv[4] || 5);
app.set('TURN', 0);
app.set('ROUND_ACTIVE', true);
app.set('ROUND_LENGTH', 10);

export default app;
