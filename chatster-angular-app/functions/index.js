const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.userSignUp = functions.auth.user().onCreate((newUser)=>{
  return admin.firestore().collection("users").doc(newUser.uid).set({
    email: newUser.email,
    avatar: newUser.photoURL,
    created_at: admin.firestore.FieldValue.serverTimestamp(),
    name: newUser.displayName,
    is_pro_member: false,
  });
});

exports.userDelete = functions.auth.user().onDelete((user)=>{
  return admin.firestore().collection("users").doc(user.uid).delete();
});
