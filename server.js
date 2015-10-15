import app from './app'

let port = process.env.PORT || 5000;
let ip = process.env.IP || '0.0.0.0';
app.listen(port, ip, () => {
  console.log(`listening on ${ip}:${port}`);
});
