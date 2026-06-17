// firebase-config.js
// TO USE: Replace the placeholder config below with your actual Firebase project config.
// You can get this by creating a free Firebase project and adding a Web App.
// Enable Realtime Database in your Firebase Console.

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Passcode to secure the Admin Panel dashboard. Feel free to change this!
const adminPasscode = "8888";

// Fallback WhatsApp Group link to use when Firebase is not configured or offline.
const defaultWhatsappUrl = "https://chat.whatsapp.com/JdeIMpfWTob0hTJ1am7sfn?s=cl&p=a&ilr=1&amv=1";
