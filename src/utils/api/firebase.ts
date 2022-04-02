import { initializeApp } from "firebase/app";
// import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENTID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// getAnalytics(app);

export const db = getFirestore(app);

export const getFcmToken = async () => {
  await Notification.requestPermission();

  const messaging = getMessaging();

  const token = await getToken(messaging, {
    vapidKey: process.env.NEXT_PUBLIC_FIREBASE_PUSH
  });

  console.log(token);

  return token;
};

export const onMessageListener = () => {
  const messaging = getMessaging();
  onMessage(messaging, payload => {
    console.log("Message received. ", payload);
    alert(
      `title: ${payload.notification.title} body: ${payload.notification.title}`
    );
  });
};
