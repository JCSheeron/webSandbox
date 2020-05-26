import http from 'http';

// The request event can be wired seperately
/*
const server = http.createServer();

server.on('request', (req, res) => {
  res.write('Hello HTTP World!!\n');
  setTimeout(() => {
    res.write('I can stream!\n');
    res.end();
  }, 3000);
});
*/

// Or the requst event can be specified when creating the server
// /*
const server = http.createServer((req, res) => {
  res.write('Hello HTTP World!!\n');
  setTimeout(() => {
    res.write('I can stream!\n');
    res.end();
  }, 3000);
});
// */

server.listen(8080);

