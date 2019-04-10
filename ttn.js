const ttn = require("ttn");
require('dotenv').config();

const { logTTN } = require('./database');

const axios = require('axios');

const appID = process.env.TTN_APP_ID;
const accessKey = process.env.TTN_ACCESS_KEY;

const servers = ["https://90e9122c.eu.ngrok.io"];

ttnDataClient = null;

module.exports.listen = async () => {

    ttnDataClient = await ttn.data(appID, accessKey);

    if (!ttnDataClient) {
        console.error("Error", error)
        process.exit(1)
    }

    ttnDataClient.on("uplink", async (devID, payload)  => {
        console.log("Received uplink from ", devID)
        console.log(payload)
        await logTTN(payload);
        var i;
        for (i = 0; i < servers.length; i++) { 
            axios.post(servers[i], {
                data: payload
                })
                .then((res) => {
                console.log(`statusCode: ${res.statusCode}`)
                console.log(res)
                })
                .catch((error) => {
                console.error(error)
                })
          }
    })
}

module.exports.sendData = async (data) => {
    if (!ttnDataClient) {
        return;
    }
console.log(data);
console.log(data);
    if (Array.isArray(data)) {
        data = new Buffer(data).toString("base64")
    } else if (data instanceof Buffer) {
        data = data.toString("base64")
    } else if (typeof data === "string") {
        data = Buffer.from(data)
    } 
    console.log(data);
    await ttnDataClient.send("test1", data);
}