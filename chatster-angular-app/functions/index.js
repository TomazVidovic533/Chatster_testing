const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const domain="localhost:4200";
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

  // TODO:  pobriši iz sob in kontaktov

  // TODO:  pobriši vse datoteke in sporočila
});

// TODO:  on create call dodaj createdBy: user id

// TODO: on delete rooms dodal da porbise datoeke iz sobe in pri userjih kjer se soba nahaja in sporočila

// TODO:  stripe payment
exports.purchaseProMembership = functions.https.onCall((data,context)=>{
  const userId = context.auth.uid;
  const stripe = require("stripe")(functions.config().stripe.secret_key);
  const session = stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url:"http://"+domain+"/home/success",
    cancel_url:"http://"+domain+"/home/success",

  })
})


// TODO:  message insepction on send
