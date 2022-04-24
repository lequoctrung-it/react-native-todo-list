import { initializeApp } from "@firebase/app"
import '@firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCE1O39mMSgiRcjqLBK9khzzkXrRFuICpY",
    authDomain: "todo-app-react-native-4730b.firebaseapp.com",
    projectId: "todo-app-react-native-4730b",
    storageBucket: "todo-app-react-native-4730b.appspot.com",
    messagingSenderId: "633299876747",
    appId: "1:633299876747:web:7f614f09179dd182844d8e"
};

export const app = initializeApp(firebaseConfig);