const functions = require("firebase-functions");

exports.saveUserData = functions.https.onRequest((request, response) => {
  functions.logger.info("user data saved!", {structuredData: true});
  response.send("User data saved!");
});
