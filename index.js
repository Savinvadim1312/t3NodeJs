const ttn = require("ttn");

const appID = "t3saxion";
const accessKey = "ttn-account-v2.KsIDoQJMmLXj-VpY1Wn03VRinxKfTMbY3RdzeKYbo6w";

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

