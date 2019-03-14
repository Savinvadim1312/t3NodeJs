## **Proof of Concept of the NodeJS server**

#### Background
The NodeJS server will be a tunnel between our base camp and the servers of other teams. It will help us share information between countries. The server will integrate with `The Thing Network (TTN)` and will listen to the messages sent by devices in our system. When receiving a message, the server will send it to other servers. 

#### Proof of Concept (PoC)
In order to be sure that we will be able to develop the server and integrate with `TTN`, we decided to create simple NodeJS listener and send manual data through `TTN` and see if the data reaches the server.

The NodeJS listener:
```
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
```

#### Testing the PoC
For testing the PoC, we registered a test device in `TTN` dashboard, and sent a test request through the network. Our server successfully received the message and displayed it in the console:
```n
Received uplink from  test1
{ app_id: 't3saxion',
  dev_id: 'test1',
  hardware_serial: '231EED1231231334',
  port: 1,
  counter: 0,
  payload_raw: <Buffer fd af da df ad fd>,
  metadata: { time: '2019-03-09T13:36:48.720166068Z' } }

```

#### Conclusion
The Proof of Concept developed in the preparation phase was successful and eliminated the risk of not being able to integrate with `TTN`. Now we are sure that we are able to easily integrate with `TTN` and listen to messages of the registered devices. During the next sprint we will have to implement the message redirection, saving the coordinates into a database and to test the integration of the server in the whole environment of the project.

#### API Doc

##### Send data
----
  Share data with the server, in order to sync all the data with the devices in our Country's System

* **URL**

  https://t3nato.herokuapp.com/data

* **Method:**

  `POST`

* **Data Params**

  **Required:**

  `data`

* **Success Response:**

  * **Code:** 200 <br />
 
* **Error Response:**

  * **Code:** 400 Bad request! <br />

* **Sample Call:**

  ```javascript
    curl --header "Content-Type: application/json" --data '{"data": "02023012301231"}' --request POST https://t3nato.herokuapp.com/data
  ```