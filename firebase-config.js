// firebase-config.js
// TO USE: Replace the placeholder config below with your actual Firebase project config.
// You can get this by creating a free Firebase project and adding a Web App.
// Enable Realtime Database in your Firebase Console.

const firebaseConfig = {
  apiKey: "AIzaSyAiTNPbPZYz37fOZicSDPU2uP_HRWof7Xk",
  authDomain: "day-millionaire-manifest.firebaseapp.com",
  databaseURL: "https://day-millionaire-manifest-default-rtdb.firebaseio.com", // Note: If your database is in Asia or Europe, double check this URL in the Firebase Console!
  projectId: "day-millionaire-manifest",
  storageBucket: "day-millionaire-manifest.firebasestorage.app",
  messagingSenderId: "163913723937",
  appId: "1:163913723937:web:decd8fdb4992537baa3360"
};

// Passcode to secure the Admin Panel dashboard. Feel free to change this!
const adminPasscode = "8888";

// Fallback WhatsApp Group link to use when Firebase is not configured or offline.
const defaultWhatsappUrl = "https://chat.whatsapp.com/JdeIMpfWTob0hTJ1am7sfn?s=cl&p=a&ilr=1&amv=1";
