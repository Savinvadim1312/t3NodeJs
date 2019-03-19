const ttn = require("ttn");
var http = require('http');
require('dotenv').config();

const { logTTN, logHTTP } = require('./database');


const appID = process.env.TTN_APP_ID;
const accessKey = process.env.TTN_ACCESS_KEY;
const port = process.env.PORT || 8080;


ttn.data(appID, accessKey)
  .then(function (client) {
    client.on("uplink", function (devID, payload) {
      console.log("Received uplink from ", devID)
      console.log(payload)
      return logTTN(payload);
    })
  })
  .catch(function (error) {
    console.error("Error", error)
    process.exit(1)
  })


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

    console.log(headers);
    console.log(method);
    console.log(url);
    console.log(body);
    // TODO send this data to ttn

    await logHTTP({headers, method, url, body});

    res.statusCode = 200;
    res.end();
  });

}).listen(port); //the server object listens on port 8080

console.log("server listens to port " + port);
