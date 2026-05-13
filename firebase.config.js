// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCRXhFCfbmed5ahe_ubzWHvNx4L1mNkevw",
	authDomain: "portfolio-creative.firebaseapp.com",
	projectId: "portfolio-creative",
	storageBucket: "portfolio-creative.firebasestorage.app",
	messagingSenderId: "894975504223",
	appId: "1:894975504223:web:03bf8b29180cc36ec010ea",
	measurementId: "G-DB0TTZ8DPK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
