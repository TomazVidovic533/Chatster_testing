/*
const functions = require("firebase-functions");

exports.saveUserData = functions.https.onRequest((request, response) => {
  functions.logger.info("user data saved!", {structuredData: true});
  response.send("User data saved!");
});
*/


const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.Storage = functions.firestore.document('Storage_Value').onUpdate((change, context) => {

  const {Storage} = require('@google-cloud/storage');
  const storage = new Storage();
  const bucket = storage.bucket('chatsterv2');

  const options = {
    destination: 'files/default_profile_avatar.jpg'
  };

  bucket.upload('default_profile_avatar.jpg', options).then(function(data) {
    const file = data[0];
  });

  return 0;
});
