const functions = require("firebase-functions");
const admin = require("firebase-admin");
const stripe = require("stripe")(functions.config().stripe.secret_key);
admin.initializeApp();
exports.userSignUp = functions.auth.user().onCreate((newUser) => {
  return admin.firestore().collection("users").doc(newUser.uid).set({
    email: newUser.email,
    avatar: newUser.photoURL,
    created_at: admin.firestore.FieldValue.serverTimestamp(),
    name: newUser.displayName,
    is_pro_member: false,
  });
});

exports.userDelete = functions.auth.user().onDelete((user) => {
  return admin.firestore().collection("users").doc(user.uid).delete();
  // TODO:  pobriši iz sob in kontaktov
  // TODO:  pobriši vse datoteke in sporočila
});
// TODO: on delete rooms dodal da porbise datoeke iz sobe in pri userjih kjer se
//  soba nahaja in sporočila
// TODO:  message insepction on send
// TODO:  stripe payment
exports.purchaseProMembership = functions.https.onCall(async (data, context) =>{
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [{
      price_data: {
        currency: "eur",
        product_data: {
          name: "Chatster PRO Membership",
          images: ["https://images.unsplash.com/photo-1548092372-0d1bd40894a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"],
        },
        unit_amount: 999,
      },
      quantity: 1,
    },
    ],
    mode: "payment",
    success_url: "http://localhost:4200/app/home/profile/"+context.auth.uid,
    cancel_url: "http://localhost:4200/app/home",
  });
  console.log(session.id);
  return session.id;
});


exports.onSuccessfullPayment = functions.https.onRequest(async (req, res) => {
  const userId = req.auth.uid;
  const stripe = require("stripe")(functions.config().stripe.token);
  let event;
  try {
    const whSec = functions.config().stripe.payments_webhook_secret;
    event = stripe.webhooks.constructEvent(
        req.rawBody,
        req.headers["stripe-signature"],
        whSec,
    );
  } catch (err) {
    console.error("Webhook signature verification failed.");
    return res.sendStatus(400);
  }
  const dataObject = event.data.object;
  await admin.firestore()
      .collection("users")
      .doc(userId)
      .collection("payments")
      .add({
        checkoutSessionId: dataObject.id,
        paymentStatus: dataObject.payment_status,
        shippingInfo: dataObject.shipping,
        amountTotal: dataObject.amount_total,
      });
  await admin.firestore.collection("users").doc(userId).update({
    is_pro_member: true,
  });
  return res.sendStatus(200);
});


