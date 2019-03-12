const ttn = require("ttn");
var http = require('http');

const appID = "t3saxion";
const accessKey = "ttn-account-v2.KsIDoQJMmLXj-VpY1Wn03VRinxKfTMbY3RdzeKYbo6w";
const port = process.env.PORT || 8080;

ttn.data(appID, accessKey)
  .then(function (client) {
    client.on("uplink", function (devID, payload) {
      console.log("Received uplink from ", devID)
      console.log(payload)
    })
  })
  .catch(function (error) {
    console.error("Error", error)
    process.exit(1)
  })


//create a server object:
http.createServer(function (req, res) {
  res.write('Hello World!'); //write a response to the client
  res.end(); //end the response
}).listen(port); //the server object listens on port 8080

console.log("server listens to port " + port);
