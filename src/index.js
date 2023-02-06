// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore, collection, addDoc, getDocs, getDoc, setDoc, doc } from "firebase/firestore";
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import {getAnalytics} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    getDoc,
    setDoc,
    doc
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
// import * as Console from "console";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCeYk7anFyvPsdvrYjl3LFvLcayizVPgbo",
    authDomain: "three-letter-sentiment.firebaseapp.com",
    projectId: "three-letter-sentiment",
    storageBucket: "three-letter-sentiment.appspot.com",
    messagingSenderId: "58160986676",
    appId: "1:58160986676:web:d7eee61dc061a4debf6861",
    measurementId: "G-38CJPTKYJH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
let db = getFirestore(app);

async function addData(word, masc, femi) {
    await setDoc(doc(db, "combinations/" + word), {}, { merge: true });
    const docSnap = await getDoc(doc(db, "combinations/" + word));
    let newData = {};
    const oldData = docSnap.data();
    console.log(oldData)
    if (Object.keys(oldData).length === 0) {
        console.log(oldData)
        newData['masc'] = masc;
        newData['femi'] = femi;
    } else {
        newData['masc'] = oldData['masc'] + masc;
        newData['femi'] = oldData['femi'] + femi;
    }
    // console.log(oldData);
    console.log(newData);
    await setDoc(doc(db, "combinations/" + word), newData);
    db = getFirestore(app);
}


async function resetDatabase() {
    const docsList = await getDocs(collection(db, 'combinations'));
    docsList.forEach((d) => {
        console.log(d.data());
        console.log(d.id);
        setDoc(doc(db, 'combinations/' + d.id), {
            masc: 0,
            femi: 0
        });
    });
}


async function handleClick(masc, femi) {
    console.log("CLICKED")
    const displayedText = $('#text')
    addData(displayedText.text(), masc, femi).then(r => {
    })
    displayedText.html(generateCombo(3));
}

function generateCombo(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

console.log(document.getElementById('masc'))
$('#text').html(generateCombo(3));
$('#masc').on('click', () => handleClick(1, 0));
$('#femi').on('click', () => handleClick(0, 1));
$('#reset').on('click', () => resetDatabase());