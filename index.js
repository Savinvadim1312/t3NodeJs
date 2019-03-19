var http = require('http');

const { logHTTP } = require('./database');
const { listen: TTNListener, sendData: sendDataToTTN } = require('./ttn');

const port = process.env.PORT || 8080;

TTNListener();


//create a server object:
http.createServer(function (req, res) {
  const { headers, method, url } = req;
  let body = [];

  req.on('error', (err) => {
    console.error(err);
  }).on('data', (chunk) => {
    body.push(chunk);
  }).on('end', async () => {
    body = Buffer.concat(body).toString();

    if (method !== "POST" || url !== '/data') {
      res.statusCode = 400;
      res.end();
      return;
    }

    body = JSON.parse(body);

    // Log the request
    await logHTTP({headers, method, url, body});

    console.log(headers);
    console.log(method);
    console.log(url);
    console.log(body);
    // TODO send this data to ttn
    sendDataToTTN(body.data);

    res.statusCode = 200;
    res.end();
  });

}).listen(port); //the server object listens on port 8080

console.log("server listens to port " + port);
