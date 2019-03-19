const ttn = require("ttn");
require('dotenv').config();

const { logTTN } = require('./database');

const appID = process.env.TTN_APP_ID;
const accessKey = process.env.TTN_ACCESS_KEY;

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