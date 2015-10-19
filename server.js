import app from './app';
import * as store from './dal/store';

store.checkIndices().then(listen, fail);

function listen() {
  const port = process.env.PORT || 5000;
  const ip = process.env.IP || '0.0.0.0';
  app.listen(port, ip, () => {
    console.log(`listening on ${ip}:${port}`);
  });
}

function fail(err) {
  console.log(err);
}
