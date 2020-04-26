const express = require("express");
const bodyParser = require("body-parser");
const { Expo } = require("expo-server-sdk");

const app = express();
const expo = new Expo();

let savedPushTokens = [];

const pushTokensHandler = message => {
  // Create message that you want to send to the clients
  let notifications = [];
  for (let pushToken of savedPushTokens) {
    // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxx]

    // Check that all your push tokens appear to be valid Expo push tokens
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push Token ${pushToken} is not a valid Expo push token.`);
      continue;
    }

    // Construct a message
    notifications.push({
      to: pushToken,
      sound: "default",
      title: "Message received!",
      body: message,
      data: { message }
    });
  }

  // Batch notifications to reduce the number of requests and to compress them
  let chunks = expo.chunkPushNotifications(notifications);

  (async () => {
    // Send the chunk to the Expo push notification service. There are
    // different strategies you could use. A simple one is to send one chunk at
    // a time, which nicely spreads the load out over time:
    for (let chunk of chunks) {
      try {
        let receipts = await expo.sendPushNotificationsAsync(chunk);
        console.log(receipts);
      } catch (error) {
        console.log(error);
      }
    }
  })();
};

// Save token
const saveToken = token => {
  if (savedPushTokens.indexOf(token) === -1) {
    savedPushTokens.push(token);
  }
};

// parse request of content-type: application/json
app.use(bodyParser.json());

// parse request of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application!" });
});

///////////////
// Notification
///////////////

app.get("/noti", (req, res) => {
  res.json("Push Notification Server is running...");
});

app.post("/token", (req, res) => {
  saveToken(req.body.token.value);
  console.log(`Received push token, ${req.body.token.value}`);
  res.send(`Received push token, ${req.body.token.value}`);
});

app.post("/message", (req, res) => {
  pushTokensHandler(req.body.message);
  console.log(`Received message, ${req.body.message}`);
  res.send(`Received message, ${req.body.message}`);
});

///////////////

require("./app/routes/account.routes")(app);
require("./app/routes/project.routes")(app);
require("./app/routes/task.routes")(app);
require("./app/routes/group.routes")(app);
require("./app/routes/auth.routes")(app);

//set port, listen for requests
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
