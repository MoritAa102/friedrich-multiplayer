import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

// 
const firebaseConfig = {
  apiKey: "AIzaSyAeM3TIPVlrNUjRc7MG1Oh3P6QvauEdIiI",
  authDomain: "friedrich-ii-onlinegame.firebaseapp.com",
  databaseURL: "https://friedrich-ii-onlinegame-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "friedrich-ii-onlinegame",
  storageBucket: "friedrich-ii-onlinegame.firebasestorage.app",
  messagingSenderId: "427784840958",
  appId: "1:427784840958:web:72ab5241a25a36215ea7af"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// 🎭 ROLLE
let myRole = "";

// 🎬 SZENEN
const scenes = [
  {
    text: "Willkommen im 18. Jahrhundert.",
    image: "images/klasse.jpg",
    sound: "sounds/glocke.mp3"
  },
  {
    text: "🎼 Friedrich II. – aufgeklärter Absolutist und Flötenspieler.",
    image: "images/friedrich.jpg",
    sound: "sounds/floete.mp3"
  },
  {
    text: "🥔 Reformen & Kartoffeln für Preußen!",
    image: "images/kartoffel.jpg",
    sound: "sounds/ruhig.mp3"
  },
  {
    text: "⚔️ Der Militärkönig in ständigen Kriegen.",
    image: "images/krieg.jpg",
    sound: "sounds/krieg.mp3"
  },
  {
    text: "⚖️ Müller-Arnold-Affäre – Gerechtigkeit oder Macht?",
    image: "images/gericht.jpg",
    sound: "sounds/ruhig.mp3"
  },
  {
    text: "🎓 Fazit: Fortschritt, Ordnung – Freiheit später.",
    image: "images/fazit.jpg",
    sound: "sounds/ruhig.mp3"
  }
];

// ▶️ ROLLE WÄHLEN
window.chooseRole = function (role) {
  myRole = role;

  document.getElementById("startScreen").style.display = "none";
  document.getElementById("gameScreen").style.display = "block";

  document.getElementById("roleText").innerText =
    "🎭 Deine Rolle: " + role;

  if (role !== "Lehrer") {
    document.getElementById("nextBtn").style.display = "none";
  }
};

// ▶️ NÄCHSTE SZENE (NUR LEHRER)
window.nextScene = function () {
  if (myRole === "Lehrer") {
    set(ref(db, "scene"), Date.now());
  }
};

// 🔄 SYNC FÜR ALLE
onValue(ref(db, "scene"), (snapshot) => {
  const index = Math.floor(Math.random() * scenes.length);
  const scene = scenes[index];

  document.getElementById("sceneText").innerText = scene.text;
  document.getElementById("sceneImage").src = scene.image;

  const audio = document.getElementById("sceneAudio");
  audio.src = scene.sound;
  audio.play();
});
